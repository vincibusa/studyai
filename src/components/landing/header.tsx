'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="text-xl font-bold text-gray-900">StudyAI</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-gray-900 transition-colors">
            Blog
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/auth">Log in</Link>
          </Button>
          <Button asChild>
            <Link href="/auth?tab=register">Get Started Free</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}