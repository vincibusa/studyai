'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useResponsive } from '@/hooks/use-responsive';
import { 
  Home, 
  BookOpen, 
  PenTool, 
  Brain, 
  MessageCircle, 
  TrendingUp, 
  BarChart3,
  Settings,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Lessons', href: '/lessons', icon: BookOpen },
  { name: 'Workspaces', href: '/workspace', icon: PenTool },
  { name: 'Quiz & Test', href: '/quiz', icon: Brain },
  { name: 'Mind Maps', href: '/mindmaps', icon: MessageCircle },
  { name: 'AI Tutor', href: '/tutor', icon: MessageCircle },
  { name: 'Grades', href: '/grades', icon: TrendingUp },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface ResponsiveSidebarProps {
  children: React.ReactNode;
}

export function ResponsiveSidebar({ children }: ResponsiveSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isMobile, isDesktop } = useResponsive();
  const pathname = usePathname();

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full bg-primary text-white">
      {/* Header */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">S</span>
            </div>
            <AnimatePresence>
              {(!isCollapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-xl font-bold whitespace-nowrap overflow-hidden"
                >
                  StudyAI
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          
          {!isMobile && isDesktop && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-white hover:bg-blue-600/50 p-1"
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-blue-600">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarFallback className="bg-blue-600 text-white">J</AvatarFallback>
          </Avatar>
          <AnimatePresence>
            {(!isCollapsed || isMobile) && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden"
              >
                <div className="font-medium">James</div>
                <div className="text-blue-200 text-sm">Student</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => isMobile && setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-600/50 hover:text-white'
                  }`}
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-white' : ''}`} />
                  <AnimatePresence>
                    {(!isCollapsed || isMobile) && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        className="font-medium whitespace-nowrap overflow-hidden"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 w-1 h-6 bg-white rounded-l-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Account */}
      <div className="p-4 border-t border-blue-600">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-600/50"
        >
          <User className="w-5 h-5 mr-3 flex-shrink-0" />
          <AnimatePresence>
            {(!isCollapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Account
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="font-bold text-gray-900">StudyAI</span>
              </div>
              
              <div className="w-8"></div> {/* Spacer for centering */}
            </header>

            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>

          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent isMobile={true} />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <motion.div
        animate={{ 
          width: isCollapsed ? 80 : 256 
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="flex-shrink-0"
      >
        <SidebarContent />
      </motion.div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}