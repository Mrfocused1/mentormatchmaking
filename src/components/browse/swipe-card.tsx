'use client'

import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  MapPin,
  Star,
  Briefcase,
  Users,
  Clock
} from 'lucide-react'

interface Mentor {
  id: number
  name: string
  title: string
  company: string
  location: string
  industry: string
  rating: number
  reviewCount: number
  mentees: number
  yearsExperience: number
  expertise: string[]
  availability: string
  bio: string
  avatar: string | null
  languages?: string[]
  industries?: string[]
}

interface SwipeCardProps {
  mentor: Mentor
  onSwipe: (direction: 'left' | 'right') => void
  isTop: boolean
}

export function SwipeCard({ mentor, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 100) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  return (
    <motion.div
      className={`absolute inset-0 cursor-grab active:cursor-grabbing ${
        isTop ? 'z-20' : 'z-10'
      }`}
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 0.7,
        scale: isTop ? 1 : 0.95,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={isTop ? {} : { scale: 0.95 }}
    >
      <Card className="h-full shadow-2xl border-2 border-neutral-200 overflow-hidden">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Hero Section with Background */}
          <div className="relative bg-white flex-shrink-0 pt-8 pb-6">
            {/* Centered Avatar and Info */}
            <div className="flex flex-col items-center text-center px-4">
              <div className="relative mb-4">
                <Avatar
                  fallback={mentor.name}
                  size="3xl"
                  className="shadow-xl"
                />
                {/* Online Status Indicator */}
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-success border-4 border-white rounded-full" />
              </div>

              <h3 className="text-2xl font-bold font-montserrat text-primary-dark mb-1">
                {mentor.name}
              </h3>
              <p className="text-base font-semibold text-neutral-700 font-montserrat mb-1">
                {mentor.title}
              </p>
              <p className="text-sm text-neutral-600 font-montserrat">
                @ {mentor.company}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-white overflow-hidden">
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-4 gap-2 p-4 border-b border-neutral-100">
              <div className="text-center">
                <Briefcase className="h-4 w-4 text-primary-accent mx-auto mb-1" />
                <p className="text-sm font-bold font-montserrat text-primary-dark">
                  {mentor.yearsExperience}
                </p>
                <p className="text-[10px] text-neutral-600 font-montserrat">Years</p>
              </div>
              <div className="text-center">
                <Users className="h-4 w-4 text-secondary-accent mx-auto mb-1" />
                <p className="text-sm font-bold font-montserrat text-primary-dark">
                  {mentor.mentees}
                </p>
                <p className="text-[10px] text-neutral-600 font-montserrat">Mentees</p>
              </div>
              <div className="text-center">
                <Star className="h-4 w-4 text-warning mx-auto mb-1 fill-warning" />
                <p className="text-sm font-bold font-montserrat text-primary-dark">
                  {mentor.rating}
                </p>
                <p className="text-[10px] text-neutral-600 font-montserrat">Rating</p>
              </div>
              <div className="text-center">
                <Clock
                  className={`h-4 w-4 mx-auto mb-1 ${
                    mentor.availability === 'Available' ? 'text-success' : 'text-warning'
                  }`}
                />
                <p
                  className={`text-[10px] font-bold font-montserrat ${
                    mentor.availability === 'Available' ? 'text-success' : 'text-warning'
                  }`}
                >
                  {mentor.availability === 'Available' ? 'Open' : 'Limited'}
                </p>
                <p className="text-[10px] text-neutral-600 font-montserrat">Status</p>
              </div>
            </div>

            {/* Company, Location & Rating */}
            <div className="px-4 py-3 border-b border-neutral-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-sm text-neutral-600 font-montserrat">
                  <MapPin className="h-4 w-4" />
                  <span>{mentor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-warning text-warning" />
                  <span className="text-sm font-bold font-montserrat text-primary-dark">
                    {mentor.rating}
                  </span>
                  <span className="text-xs text-neutral-600 font-montserrat">
                    ({mentor.reviewCount})
                  </span>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="px-4 py-4">
              <h4 className="text-xs font-bold font-montserrat text-primary-dark mb-2 uppercase tracking-wide">
                About
              </h4>
              <p className="text-sm text-neutral-700 font-montserrat leading-relaxed line-clamp-3">
                {mentor.bio}
              </p>
            </div>

            {/* Expertise Tags */}
            <div className="px-4 pb-4">
              <h4 className="text-xs font-bold font-montserrat text-primary-dark mb-2 uppercase tracking-wide">
                Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {mentor.expertise.slice(0, 4).map((skill, index) => (
                  <Badge
                    key={index}
                    className="bg-primary-accent/10 text-primary-accent border-primary-accent/20"
                    size="sm"
                  >
                    {skill}
                  </Badge>
                ))}
                {mentor.expertise.length > 4 && (
                  <Badge variant="secondary" size="sm">
                    +{mentor.expertise.length - 4} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Industry */}
            <div className="px-4 pb-4">
              <h4 className="text-xs font-bold font-montserrat text-primary-dark mb-2 uppercase tracking-wide">
                Industry
              </h4>
              <Badge variant="outline" className="border-secondary-accent text-secondary-accent">
                {mentor.industry}
              </Badge>
            </div>
          </div>

          {/* Swipe Indicators */}
          <motion.div
            className="absolute top-32 right-8 bg-vibrant-accent text-white px-6 py-3 rounded-full font-bold font-montserrat text-lg shadow-xl transform rotate-12 pointer-events-none"
            style={{
              opacity: useTransform(x, [0, 100], [0, 1]),
            }}
          >
            CONNECT
          </motion.div>
          <motion.div
            className="absolute top-32 left-8 bg-neutral-600 text-white px-6 py-3 rounded-full font-bold font-montserrat text-lg shadow-xl transform -rotate-12 pointer-events-none"
            style={{
              opacity: useTransform(x, [-100, 0], [1, 0]),
            }}
          >
            PASS
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
