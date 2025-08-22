'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search, 
  Bell, 
  Plus,
  ChevronDown,
  Calendar,
  Settings as SettingsIcon,
  Command
} from 'lucide-react';
import { AppBreadcrumb } from './app-breadcrumb';
import { useResponsive } from '@/hooks/use-responsive';

export function AppHeader() {
  const [searchValue, setSearchValue] = useState('');
  const { isMobile } = useResponsive();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb and Search */}
        <div className="flex items-center space-x-4 flex-1">
          {!isMobile && <AppBreadcrumb />}
          
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder={isMobile ? "Search..." : "Search lessons, quizzes, notes..."}
              className="pl-10 bg-gray-50 border-0 focus:bg-white"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            {!isMobile && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="inline-flex items-center rounded border border-gray-200 px-2 py-1 text-xs font-medium text-gray-500">
                  <Command className="w-3 h-3 mr-1" />
                  K
                </kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Quick Actions */}
          {!isMobile && (
            <Button variant="outline" size="sm" className="text-gray-600">
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden md:inline">New</span>
            </Button>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
              3
            </Badge>
          </Button>

          {/* Calendar Quick Access */}
          {!isMobile && (
            <Button variant="ghost" size="sm" className="text-gray-600">
              <Calendar className="w-5 h-5" />
            </Button>
          )}

          {/* Profile Menu */}
          <div className="flex items-center space-x-3 pl-2 lg:pl-4 border-l border-gray-200">
            {!isMobile && (
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-gray-900">James</div>
                <div className="text-xs text-gray-500">Student</div>
              </div>
            )}
            <Button variant="ghost" size="sm" className="p-0">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white text-sm">J</AvatarFallback>
              </Avatar>
              {!isMobile && <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Breadcrumb */}
      {isMobile && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <AppBreadcrumb />
        </div>
      )}
    </motion.header>
  );
}