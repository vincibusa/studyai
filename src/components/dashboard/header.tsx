'use client';

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
  Settings as SettingsIcon
} from 'lucide-react';

export function DashboardHeader() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white border-b border-gray-200 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb and Search */}
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center text-sm text-gray-600">
            <span>Dashboard</span>
          </div>
          
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-gray-50 border-0 focus:bg-white"
            />
          </div>
        </div>

        {/* Right side - Actions and Profile */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <Button variant="outline" size="sm" className="text-gray-600">
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden md:inline">New</span>
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
              3
            </Badge>
          </Button>

          {/* Calendar Quick Access */}
          <Button variant="ghost" size="sm" className="text-gray-600">
            <Calendar className="w-5 h-5" />
          </Button>

          {/* Profile Menu */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right hidden md:block">
              <div className="text-sm font-medium text-gray-900">Apr Kpnt</div>
              <div className="text-xs text-gray-500">Student</div>
            </div>
            <Button variant="ghost" size="sm" className="p-0">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary text-white text-sm">A</AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}