'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Clock, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Star,
    title: 'Adaptive Learning',
    description: 'Continuous improvement based on your interactions.',
    delay: 0.1,
  },
  {
    icon: Clock,
    title: '24/7 Assistance',
    description: 'Get they avanzions explanations in lorem ipsum.',
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Maintain your preferences and achieve your goals.',
    delay: 0.3,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-powered tools to transform your learning experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: feature.delay }}
            >
              <Card className="text-center p-8 h-full border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <Card className="max-w-4xl mx-auto bg-white border-0 shadow-lg">
            <CardContent className="p-12">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <blockquote className="text-lg text-gray-700 mb-4">
                    "StudyAl has revolutionized the way I study. My grades have never been better!"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">Orvie Williams</div>
                    <div className="text-gray-600">Student</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}