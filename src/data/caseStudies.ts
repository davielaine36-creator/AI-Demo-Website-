export interface CaseStudy {
  id: string
  title: string
  status: string
  problem: string
  system: string[]
  success: string
  currentStatus: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'brown-academy',
    title: 'Brown Academy — Training Website & Scheduling System',
    status: 'Pilot / internal build',
    problem:
      'Course information, student inquiries, and requalification scheduling live in different places, which makes it easy for questions and renewals to slip through.',
    system: [
      'Website cleanup',
      'Course information',
      'Requalification scheduling',
      'Student inquiry tracking',
      'Follow-up reminders',
    ],
    success:
      'Students can find clear course info, inquiries land in one place, and requalification reminders go out before deadlines pass.',
    currentStatus:
      'Early pilot / internal build. Documenting the before, build, and after as the system takes shape.',
  },
  {
    id: 'window-service',
    title: 'Window Service / Construction Business — Lead & Follow-Up System',
    status: 'Pilot / discovery',
    problem:
      'Quote requests come in by call, text, and email, and details get scattered — so follow-ups are inconsistent and past customers rarely hear back.',
    system: [
      'Quote request form',
      'Customer dashboard',
      'Job status tracking',
      'Owner alerts',
      'AI follow-up drafts',
      'Past customer follow-up',
    ],
    success:
      'Every quote request is captured, the owner is alerted quickly, follow-ups are drafted automatically, and past customers can be re-engaged.',
    currentStatus:
      'Pilot / discovery. Mapping the current process before building the smallest useful first version.',
  },
]
