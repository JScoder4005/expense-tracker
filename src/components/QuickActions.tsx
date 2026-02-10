import { useState, useEffect } from 'react';
import { TrendingDown, TrendingUp, PieChart, Zap, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  shortcut?: string;
  color: string;
}

export function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  // Hide tooltip after first interaction
  useEffect(() => {
    const hasSeenTooltip = localStorage.getItem('quickActionsTooltipSeen');
    if (hasSeenTooltip) {
      setShowTooltip(false);
    }
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!localStorage.getItem('quickActionsTooltipSeen')) {
      localStorage.setItem('quickActionsTooltipSeen', 'true');
      setShowTooltip(false);
    }
  };

  const quickActions: QuickAction[] = [
    {
      id: 'add-expense',
      label: 'Add Expense',
      icon: TrendingDown,
      onClick: () => {
        // Navigate or trigger expense dialog
        window.location.href = '/expenses';
        setIsOpen(false);
      },
      shortcut: 'E',
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      id: 'add-income',
      label: 'Add Income',
      icon: TrendingUp,
      onClick: () => {
        // Navigate or trigger income dialog
        window.location.href = '/expenses';
        setIsOpen(false);
      },
      shortcut: 'I',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'view-analytics',
      label: 'Analytics',
      icon: PieChart,
      onClick: () => {
        window.location.href = '/analytics';
        setIsOpen(false);
      },
      shortcut: 'A',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Only trigger if Alt/Option key is pressed with the letter
      if (e.altKey) {
        const action = quickActions.find(
          (a) => a.shortcut?.toLowerCase() === e.key.toLowerCase()
        );
        if (action) {
          e.preventDefault();
          action.onClick();
        }
      }
      
      // Toggle menu with Alt+Q
      if (e.altKey && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Quick Action Buttons */}
      <div
        className={cn(
          'flex flex-col-reverse gap-3 mb-3 transition-all duration-300',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <TooltipProvider key={action.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="lg"
                    className={cn(
                      'h-12 w-12 rounded-full shadow-lg text-white transition-all duration-300',
                      action.color,
                      'hover:scale-110 hover:shadow-xl'
                    )}
                    onClick={action.onClick}
                    style={{
                      animation: `slideInRight 0.3s ease-out ${index * 0.05}s both`,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="left" className="flex items-center gap-2">
                  <span>{action.label}</span>
                  {action.shortcut && (
                    <kbd className="px-2 py-0.5 text-xs font-semibold bg-muted rounded">
                      Alt+{action.shortcut}
                    </kbd>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <TooltipProvider>
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <Button
              size="lg"
              onClick={handleToggle}
              className={cn(
                'h-14 w-14 rounded-full shadow-2xl transition-all duration-300 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700',
                isOpen && 'rotate-45'
              )}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Zap className="h-6 w-6 text-white" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="max-w-xs">
            <div className="space-y-1">
              <p className="font-semibold">Quick Actions</p>
              <p className="text-xs text-muted-foreground">
                Press Alt+Q to toggle or use Alt+E/I/A for quick access
              </p>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <style>
        {`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
}
