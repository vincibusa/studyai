'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  User,
  Bell,
  Palette,
  Brain,
  Shield,
  CreditCard,
  Download,
  Settings as SettingsIcon,
  Camera,
  Save,
  Eye,
  EyeOff,
  Smartphone,
  Mail,
  Globe,
  Moon,
  Sun,
  Volume2,
  Clock,
  Languages
} from 'lucide-react';

const settingsTabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'ai', label: 'AI Preferences', icon: Brain },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'data', label: 'Data & Privacy', icon: Download },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    // Profile
    name: 'James Wilson',
    email: 'james.wilson@university.edu',
    university: 'MIT',
    course: 'Computer Science',
    year: '3rd Year',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    studyReminders: true,
    weeklyReports: true,
    examAlerts: true,
    
    // Appearance
    theme: 'system',
    accentColor: 'blue',
    fontSize: 'medium',
    
    // AI Preferences
    tutorPersonality: 'encouraging',
    responseDetail: 'balanced',
    language: 'english',
    autoGeneration: true,
    
    // Security
    twoFactor: false,
    sessionTimeout: '30',
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Photo */}
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">JW</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  variant="outline"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Profile Picture</h3>
                <p className="text-sm text-gray-600 mb-2">Upload a photo to personalize your account</p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Upload New</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.name}
                  onChange={(e) => handleSettingChange('name', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleSettingChange('email', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  value={settings.university}
                  onChange={(e) => handleSettingChange('university', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">Course of Study</Label>
                <Input
                  id="course"
                  value={settings.course}
                  onChange={(e) => handleSettingChange('course', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="year">Academic Year</Label>
                <Input
                  id="year"
                  value={settings.year}
                  onChange={(e) => handleSettingChange('year', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Email Notifications</h3>
              <div className="space-y-4">
                {[
                  { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive notifications via email' },
                  { key: 'weeklyReports', label: 'Weekly progress reports', desc: 'Summary of your study activity' },
                  { key: 'examAlerts', label: 'Exam reminders', desc: 'Alerts for upcoming exams' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 glass-card rounded-lg backdrop-blur-sm border border-gray-200/30">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleSettingChange(item.key, !settings[item.key as keyof typeof settings])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[item.key as keyof typeof settings] ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Push Notifications</h3>
              <div className="space-y-4">
                {[
                  { key: 'pushNotifications', label: 'Push notifications', desc: 'Receive notifications on your device' },
                  { key: 'studyReminders', label: 'Study reminders', desc: 'Reminders for scheduled study sessions' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 glass-card rounded-lg backdrop-blur-sm border border-gray-200/30">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleSettingChange(item.key, !settings[item.key as keyof typeof settings])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[item.key as keyof typeof settings] ? 'bg-primary' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'appearance':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Theme</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Smartphone },
                ].map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => handleSettingChange('theme', theme.value)}
                    className={`p-4 border-2 rounded-lg transition-colors ${
                      settings.theme === theme.value ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <theme.icon className="w-6 h-6 mx-auto mb-2" />
                    <div className="font-medium">{theme.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Accent Color</h3>
              <div className="flex space-x-3">
                {[
                  { value: 'blue', color: 'bg-blue-500' },
                  { value: 'green', color: 'bg-green-500' },
                  { value: 'purple', color: 'bg-purple-500' },
                  { value: 'orange', color: 'bg-orange-500' },
                  { value: 'red', color: 'bg-red-500' },
                ].map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleSettingChange('accentColor', color.value)}
                    className={`w-8 h-8 rounded-full ${color.color} ${
                      settings.accentColor === color.value ? 'ring-2 ring-gray-400 ring-offset-2' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Font Size</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'small', label: 'Small' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'large', label: 'Large' },
                ].map((size) => (
                  <button
                    key={size.value}
                    onClick={() => handleSettingChange('fontSize', size.value)}
                    className={`p-3 border-2 rounded-lg transition-colors ${
                      settings.fontSize === size.value ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">AI Tutor Personality</h3>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { value: 'encouraging', label: 'Encouraging', desc: 'Positive and motivating responses' },
                  { value: 'professional', label: 'Professional', desc: 'Direct and fact-focused responses' },
                  { value: 'friendly', label: 'Friendly', desc: 'Casual and conversational tone' },
                  { value: 'socratic', label: 'Socratic', desc: 'Guides learning through questions' },
                ].map((personality) => (
                  <button
                    key={personality.value}
                    onClick={() => handleSettingChange('tutorPersonality', personality.value)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      settings.tutorPersonality === personality.value ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    <div className="font-medium">{personality.label}</div>
                    <div className="text-sm text-gray-600">{personality.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Response Detail Level</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'brief', label: 'Brief' },
                  { value: 'balanced', label: 'Balanced' },
                  { value: 'detailed', label: 'Detailed' },
                ].map((level) => (
                  <button
                    key={level.value}
                    onClick={() => handleSettingChange('responseDetail', level.value)}
                    className={`p-3 border-2 rounded-lg transition-colors ${
                      settings.responseDetail === level.value ? 'border-primary bg-primary/5' : 'border-gray-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Auto-generate content</div>
                <div className="text-sm text-gray-600">Automatically create summaries, quizzes, and mind maps</div>
              </div>
              <button
                onClick={() => handleSettingChange('autoGeneration', !settings.autoGeneration)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.autoGeneration ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    settings.autoGeneration ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Password</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <Button variant="outline">Update Password</Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <div className="font-medium">Two-factor authentication</div>
                <div className="text-sm text-gray-600">Add an extra layer of security to your account</div>
              </div>
              <div className="flex items-center space-x-3">
                {settings.twoFactor && <Badge className="bg-green-100 text-green-800">Enabled</Badge>}
                <Button variant={settings.twoFactor ? 'outline' : 'default'} size="sm">
                  {settings.twoFactor ? 'Disable' : 'Enable'} 2FA
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Session Management</h3>
              <div className="space-y-2">
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => handleSettingChange('sessionTimeout', e.target.value)}
                  className="w-32"
                />
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Current Plan</h3>
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">Student Plan</h4>
                      <p className="text-gray-600">€9.99/month • Billed monthly</p>
                      <p className="text-sm text-gray-500 mt-2">Next billing: May 15, 2024</p>
                    </div>
                    <Badge className="bg-primary text-white">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex space-x-4">
              <Button variant="outline">Change Plan</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-6 bg-gray-300 rounded"></div>
                    <div>
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <div className="text-sm text-gray-500">Expires 12/26</div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Update</Button>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Billing History</h3>
              <div className="space-y-3">
                {[
                  { date: 'Apr 15, 2024', amount: '€9.99', status: 'Paid' },
                  { date: 'Mar 15, 2024', amount: '€9.99', status: 'Paid' },
                  { date: 'Feb 15, 2024', amount: '€9.99', status: 'Paid' },
                ].map((invoice, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{invoice.date}</div>
                      <div className="text-sm text-gray-500">Student Plan</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="font-medium">{invoice.amount}</div>
                      <Badge className="bg-green-100 text-green-800">{invoice.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-4">Data Export</h3>
              <p className="text-gray-600 mb-4">
                Download all your data including lessons, notes, quiz results, and analytics.
              </p>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export All Data
              </Button>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Data Retention</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="font-medium mb-2">Automatic Data Cleanup</div>
                  <p className="text-sm text-gray-600 mb-3">
                    Automatically delete old study sessions and temporary files after a specified period.
                  </p>
                  <select className="border rounded px-3 py-2">
                    <option>Keep for 1 year</option>
                    <option>Keep for 2 years</option>
                    <option>Keep forever</option>
                  </select>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-4">Privacy Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Analytics Data Collection</div>
                    <div className="text-sm text-gray-600">Help improve StudyAI by sharing usage analytics</div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-900 mb-2">Danger Zone</h4>
              <p className="text-sm text-red-700 mb-3">
                These actions are permanent and cannot be undone.
              </p>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </motion.div>

      <div className="flex flex-col xl:flex-row gap-6">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="xl:w-64 flex-shrink-0"
        >
          <div className="glass-card rounded-2xl p-6 backdrop-blur-xl border border-gray-200/30">
          <nav className="space-y-2">
            {settingsTabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors magnetic-hover ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-3d'
                    : 'glass-card backdrop-blur-sm border border-gray-200/30 text-gray-700 hover:bg-primary/10'
                }`}
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </motion.button>
            ))}
          </nav>
        </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1"
        >
          <div className="glass-card rounded-2xl backdrop-blur-xl border border-gray-200/30">
            <div className="p-6 border-b border-gray-200/30">
              <h3 className="text-lg font-bold text-gray-900 flex items-center">
                {(() => {
                  const activeTabData = settingsTabs.find(tab => tab.id === activeTab);
                  if (activeTabData) {
                    const IconComponent = activeTabData.icon;
                    return <IconComponent className="w-5 h-5 mr-2" />;
                  }
                  return null;
                })()}
                {settingsTabs.find(tab => tab.id === activeTab)?.label}
              </h3>
            </div>
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}