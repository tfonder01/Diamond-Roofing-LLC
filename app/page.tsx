'use client'

import { useEffect, useId, useMemo, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Grid2X2,
  Hammer,
  House,
  Mail,
  MapPin,
  Menu,
  MessageSquare,
  Phone,
  ShieldCheck,
  Star,
  Upload,
  X,
} from 'lucide-react'

type ServiceOption = 'roofing' | 'roof-repair' | 'siding' | 'remodeling-additions' | 'framing-addition' | 'decks-fencing'
type ProjectTypeOption =
  | 'replacement'
  | 'repair'
  | 'new-install'
  | 'addition'
  | 'storm-damage'
  | 'refresh'
  | 'other'
type TimelineOption = 'asap' | '1-3-months' | '3-6-months' | 'planning'
type PropertyTypeOption = 'single-family' | 'townhome' | 'ranch' | 'other'
type ContactPreference = 'phone-text' | 'email' | 'either'

type EstimateRequest = {
  service: ServiceOption | ''
  projectType: ProjectTypeOption | ''
  projectDetails: string
  propertyType: PropertyTypeOption | ''
  zipCode: string
  address: string
  timeline: TimelineOption | ''
  photoNames: string[]
  name: string
  phone: string
  email: string
  contactPreference: ContactPreference | ''
}

type LeadSubmissionRequest = EstimateRequest & {
  submittedAt: string
}

type LeadSubmissionResult = {
  referenceNumber: string
  message: string
}

interface LeadService {
  createLead(request: LeadSubmissionRequest): Promise<LeadSubmissionResult>
}

const leadService: LeadService = {
  async createLead() {
    await new Promise((resolve) => setTimeout(resolve, 900))

    return {
      referenceNumber: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
      message: 'Demo only. No production backend is connected yet.',
    }
  },
}

const images = {
  logo: '/images/diamond-logo.png',
  hero: '/images/hero-roof.jpg',
  crewLadder: '/images/crew-ladder.jpg',
  roofProject: '/images/roof-project-02.jpg',
  sidingOne: '/images/siding-project-01.jpg',
  sidingTwo: '/images/siding-project-02.jpg',
}

const navItems = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Our Process' },
  { href: '#projects', label: 'Projects' },
  { href: '#service-area', label: 'Service Area' },
  { href: '#contact', label: 'Contact' },
] as const

const serviceCards = [
  {
    service: 'roofing' as const,
    icon: House,
    title: 'Residential Roofing',
    description: 'Roof installations and full replacements for single-family homes, built to protect what matters most.',
  },
  {
    service: 'roof-repair' as const,
    icon: Hammer,
    title: 'Roof Repairs',
    description: 'Targeted repairs for leaks, damaged shingles, and worn areas to help extend the life of your existing roof.',
  },
  {
    service: 'siding' as const,
    icon: Grid2X2,
    title: 'Siding',
    description: "Siding repairs and replacements that refresh your home's exterior and help protect it from the weather.",
  },
  {
    service: 'remodeling-additions' as const,
    icon: MessageSquare,
    title: 'Remodeling and Additions',
    description: 'Interior remodels and home additions planned around how your household actually lives and grows.',
  },
  {
    service: 'framing-addition' as const,
    icon: ShieldCheck,
    title: 'Framing',
    description: 'Residential framing work that supports the structure behind your remodel, addition, or repair.',
  },
  {
    service: 'decks-fencing' as const,
    icon: Upload,
    title: 'Decks and Fencing',
    description: 'Outdoor decks and fencing that add usable space and define your property with clean, sturdy construction.',
  },
] as const

const projects = [
  {
    image: images.crewLadder,
    category: 'Roofing',
    title: 'Roof underlayment installation',
    alt: 'Diamond Roofing crew installing roof underlayment on a residential home',
  },
  {
    image: images.roofProject,
    category: 'Framing',
    title: 'Framing for a backyard addition',
    alt: 'Structural framing posts installed for a residential addition project',
  },
  {
    image: images.sidingOne,
    category: 'Siding',
    title: 'Siding replacement on a two-story home',
    alt: 'Crew installing siding on a residential exterior',
  },
  {
    image: images.sidingTwo,
    category: 'Siding',
    title: 'Siding and trim work along the roofline',
    alt: 'Crew working on siding and trim near the roofline of a home',
  },
] as const

const processSteps = [
  {
    number: '01',
    title: 'Tell Us About the Project',
    description: 'Share the basics through the Estimate Assistant — service, scope, and where the property is located.',
  },
  {
    number: '02',
    title: 'We Review the Details',
    description: 'A team member looks over your request and any photos you choose to share.',
  },
  {
    number: '03',
    title: 'Discuss the Property and Scope',
    description: 'We talk through the project with you so the scope is clear before any work begins.',
  },
  {
    number: '04',
    title: 'Receive the Next Steps',
    description: "You'll get clear direction on how to move forward, with no pressure to decide on the spot.",
  },
] as const

const whatToExpect = [
  {
    icon: MessageSquare,
    title: 'Clear communication',
    description: 'We keep the conversation straightforward, so you always know where your project stands.',
  },
  {
    icon: House,
    title: 'Respect for your property',
    description: 'Your home is treated like it matters — careful, tidy work from start to finish.',
  },
  {
    icon: ShieldCheck,
    title: 'Details reviewed upfront',
    description: 'Project scope is discussed and confirmed before any work begins, not after.',
  },
] as const

type GoogleReview = {
  author: string
  rating: number
  text: string
  date: string
}

// No reviews have been supplied yet. This section stays hidden until genuine
// Google reviews are added here — no placeholder names, ratings, or counts.
const googleReviews: GoogleReview[] = []

const faqs = [
  {
    question: 'What types of residential projects do you handle?',
    answer:
      'Diamond Roofing focuses on residential roofing, repairs, siding, remodeling, additions, framing, decks, and fencing for homeowners in and around Clarksville.',
  },
  {
    question: 'Can I send photos of the damage or project?',
    answer: 'Yes. Photos are optional, but they can help us understand the project before we follow up.',
  },
  {
    question: 'How does the estimate process begin?',
    answer:
      'Start with the Estimate Assistant or call directly. We review the details, confirm the property area, and then outline the next step.',
  },
  {
    question: 'Do you offer both repairs and full replacements?',
    answer: 'Yes. The right next step depends on the project condition, goals, and the scope you share with us.',
  },
  {
    question: 'Which areas do you serve?',
    answer:
      'Clarksville, Springfield, Nashville, Dickson, and nearby Kentucky communities are all part of the regular service area.',
  },
  {
    question: 'How will Diamond Roofing contact me?',
    answer:
      'We follow the contact preference you select. If you prefer phone or text, include your phone number. If you prefer email, include your email address.',
  },
] as const

const stageLabels = ['Service', 'Project', 'Property', 'Photos', 'Contact', 'Review'] as const

const initialRequest: EstimateRequest = {
  service: '',
  projectType: '',
  projectDetails: '',
  propertyType: '',
  zipCode: '',
  address: '',
  timeline: '',
  photoNames: [],
  name: '',
  phone: '',
  email: '',
  contactPreference: '',
}

const projectTypeOptions: Record<ServiceOption, { value: ProjectTypeOption; label: string }[]> = {
  roofing: [
    { value: 'replacement', label: 'Full replacement' },
    { value: 'new-install', label: 'New installation' },
    { value: 'storm-damage', label: 'Storm or weather damage' },
    { value: 'other', label: 'Other roofing project' },
  ],
  'roof-repair': [
    { value: 'repair', label: 'Leak or localized repair' },
    { value: 'storm-damage', label: 'Storm or weather damage' },
    { value: 'refresh', label: 'General roof maintenance' },
    { value: 'other', label: 'Other repair need' },
  ],
  siding: [
    { value: 'repair', label: 'Siding repair' },
    { value: 'replacement', label: 'Full replacement' },
    { value: 'refresh', label: 'Refresh existing exterior' },
    { value: 'other', label: 'Other siding project' },
  ],
  'remodeling-additions': [
    { value: 'addition', label: 'Home addition' },
    { value: 'refresh', label: 'Interior remodel' },
    { value: 'other', label: 'Other remodeling project' },
  ],
  'framing-addition': [
    { value: 'addition', label: 'Addition framing' },
    { value: 'new-install', label: 'New structural framing' },
    { value: 'repair', label: 'Structural repair framing' },
    { value: 'other', label: 'Other framing project' },
  ],
  'decks-fencing': [
    { value: 'new-install', label: 'New deck or fence' },
    { value: 'replacement', label: 'Replacement project' },
    { value: 'repair', label: 'Repair or partial rebuild' },
    { value: 'other', label: 'Other outdoor project' },
  ],
}

const serviceLabels: Record<ServiceOption, string> = {
  roofing: 'Residential Roofing',
  'roof-repair': 'Roof Repairs',
  siding: 'Siding',
  'remodeling-additions': 'Remodeling and Additions',
  'framing-addition': 'Framing',
  'decks-fencing': 'Decks and Fencing',
}

const projectLabels: Record<ProjectTypeOption, string> = {
  replacement: 'Replacement',
  repair: 'Repair',
  'new-install': 'New installation',
  addition: 'Addition',
  'storm-damage': 'Storm damage',
  refresh: 'Refresh or remodel',
  other: 'Other',
}

const propertyLabels: Record<PropertyTypeOption, string> = {
  'single-family': 'Single-family home',
  townhome: 'Townhome',
  ranch: 'Ranch or one-level home',
  other: 'Other',
}

const timelineLabels: Record<TimelineOption, string> = {
  asap: 'As soon as possible',
  '1-3-months': 'Within 1 to 3 months',
  '3-6-months': 'Within 3 to 6 months',
  planning: 'Just planning ahead',
}

const contactLabels: Record<ContactPreference, string> = {
  'phone-text': 'Phone or text',
  email: 'Email',
  either: 'Either is fine',
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, '')
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) return []

  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute('hidden') && !element.getAttribute('aria-hidden'))
}

function validateStage(stage: number, request: EstimateRequest) {
  const errors: Partial<Record<keyof EstimateRequest, string>> = {}

  if (stage === 0 && !request.service) {
    errors.service = 'Choose a service to continue.'
  }

  if (stage === 1) {
    if (!request.projectType) {
      errors.projectType = 'Choose the project type that fits best.'
    }

    if (!request.projectDetails.trim()) {
      errors.projectDetails = 'Add a short project description.'
    }
  }

  if (stage === 2) {
    if (!request.propertyType) {
      errors.propertyType = 'Select the property type.'
    }

    if (!/^\d{5}$/.test(request.zipCode.trim())) {
      errors.zipCode = 'Enter a valid 5-digit ZIP code.'
    }

    if (!request.timeline) {
      errors.timeline = 'Choose a general timeline.'
    }
  }

  if (stage === 4) {
    if (!request.name.trim()) {
      errors.name = 'Enter your name.'
    }

    if (!request.contactPreference) {
      errors.contactPreference = 'Choose how you want to be contacted.'
    }

    const hasPhone = normalizePhone(request.phone).length >= 10
    const hasEmail = /\S+@\S+\.\S+/.test(request.email.trim())

    if (request.contactPreference === 'phone-text' && !hasPhone) {
      errors.phone = 'Phone is required when phone or text is preferred.'
    }

    if (request.contactPreference === 'email' && !hasEmail) {
      errors.email = 'Email is required when email is preferred.'
    }

    if (request.contactPreference === 'either' && !hasPhone && !hasEmail) {
      errors.phone = 'Add at least one contact method.'
      errors.email = 'Add at least one contact method.'
    }
  }

  return errors
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[number]
  isOpen: boolean
  onToggle: () => void
}) {
  const id = useId()

  return (
    <div className="faq-item">
      <button
        className="faq-trigger"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        id={`${id}-trigger`}
      >
        <span>{item.question}</span>
        <ChevronDown className={isOpen ? 'is-open' : ''} size={18} />
      </button>
      <div
        className="faq-panel"
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        hidden={!isOpen}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  )
}

function EstimateAssistant({
  isOpen,
  onClose,
  initialService,
}: {
  isOpen: boolean
  onClose: () => void
  initialService: ServiceOption | ''
}) {
  const [stage, setStage] = useState(0)
  const [request, setRequest] = useState<EstimateRequest>({
    ...initialRequest,
    service: initialService,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof EstimateRequest, string>>>({})
  const [submissionState, setSubmissionState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [submissionResult, setSubmissionResult] = useState<LeadSubmissionResult | null>(null)
  const [submissionError, setSubmissionError] = useState('')
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousActiveRef = useRef<HTMLElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const scrollYRef = useRef(0)
  const [isDragActive, setIsDragActive] = useState(false)

  useEffect(() => {
    if (isOpen) {
      previousActiveRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      scrollYRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      closeButtonRef.current?.focus()
      return
    }

    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.left = ''
    document.body.style.right = ''
    document.body.style.overflow = ''
    window.scrollTo(0, scrollYRef.current)
    previousActiveRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusableElements(dialogRef.current)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) {
      setRequest((current) => (current.service ? current : { ...current, service: initialService }))
    }
  }, [initialService, isOpen])

  const projectOptions = useMemo(
    () => (request.service ? projectTypeOptions[request.service] : []),
    [request.service],
  )

  const reviewGroups = [
    {
      title: 'Service',
      stage: 0,
      rows: [['Service', request.service ? serviceLabels[request.service] : 'Not selected']],
    },
    {
      title: 'Project',
      stage: 1,
      rows: [
        ['Project type', request.projectType ? projectLabels[request.projectType] : 'Not selected'],
        ['Details', request.projectDetails || 'Not provided'],
      ],
    },
    {
      title: 'Property',
      stage: 2,
      rows: [
        ['Property type', request.propertyType ? propertyLabels[request.propertyType] : 'Not selected'],
        ['ZIP code', request.zipCode || 'Not provided'],
        ['Address', request.address || 'Optional - not provided'],
        ['Timeline', request.timeline ? timelineLabels[request.timeline] : 'Not selected'],
      ],
    },
    {
      title: 'Photos',
      stage: 3,
      rows: [['Photos', request.photoNames.length ? request.photoNames.join(', ') : 'No photos added']],
    },
    {
      title: 'Contact',
      stage: 4,
      rows: [
        ['Name', request.name || 'Not provided'],
        ['Phone', request.phone || 'Not provided'],
        ['Email', request.email || 'Not provided'],
        ['Preferred contact', request.contactPreference ? contactLabels[request.contactPreference] : 'Not selected'],
      ],
    },
  ] as const

  const phoneRequirement: 'required' | 'recommended' | 'optional' =
    request.contactPreference === 'phone-text' ? 'required' : request.contactPreference === 'either' ? 'recommended' : 'optional'
  const emailRequirement: 'required' | 'recommended' | 'optional' =
    request.contactPreference === 'email' ? 'required' : request.contactPreference === 'either' ? 'recommended' : 'optional'

  const requirementLabel = { required: 'Required', recommended: 'Recommended', optional: 'Optional' } as const

  function updateRequest<K extends keyof EstimateRequest>(key: K, value: EstimateRequest[K]) {
    setRequest((current) => ({ ...current, [key]: value }))
    setErrors((current) => ({ ...current, [key]: undefined }))
    if (submissionState !== 'idle') {
      setSubmissionState('idle')
      setSubmissionError('')
      setSubmissionResult(null)
    }
  }

  function handleServiceSelection(service: ServiceOption) {
    setRequest((current) => ({
      ...current,
      service,
      projectType: '',
    }))
    setErrors((current) => ({ ...current, service: undefined, projectType: undefined }))
  }

  function handleFiles(fileList: FileList | null) {
    const files = Array.from(fileList ?? [])
    updateRequest(
      'photoNames',
      files.map((file) => file.name),
    )
  }

  function handlePhotoInputChange(event: ChangeEvent<HTMLInputElement>) {
    handleFiles(event.target.files)
  }

  function handleDragOver(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragActive(true)
  }

  function handleDragLeave() {
    setIsDragActive(false)
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault()
    setIsDragActive(false)
    handleFiles(event.dataTransfer.files)
  }

  function moveStage(direction: 'next' | 'back') {
    if (direction === 'back') {
      setStage((current) => Math.max(0, current - 1))
      return
    }

    const nextErrors = validateStage(stage, request)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setErrors({})
    setStage((current) => Math.min(stageLabels.length - 1, current + 1))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    const nextErrors = validateStage(4, request)
    if (Object.keys(nextErrors).length > 0) {
      setStage(4)
      setErrors(nextErrors)
      return
    }

    setSubmissionState('loading')
    setSubmissionError('')

    try {
      const result = await leadService.createLead({
        ...request,
        submittedAt: new Date().toISOString(),
      })

      setSubmissionResult(result)
      setSubmissionState('success')
    } catch (error) {
      setSubmissionState('error')
      setSubmissionError(error instanceof Error ? error.message : 'Unable to submit the request right now.')
    }
  }

  function handleDialogClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  function goToStage(targetStage: number) {
    setStage(targetStage)
  }

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" onMouseDown={handleDialogClick}>
      <div
        className="modal-shell"
        role="dialog"
        aria-modal="true"
        aria-labelledby="estimate-title"
        aria-describedby="estimate-description"
        ref={dialogRef}
      >
        <div className="modal-top">
          <div className="modal-top-row">
            <div className="modal-heading">
              <p className="modal-eyebrow">Estimate Assistant</p>
              <h2 id="estimate-title">{stageLabels[stage]}</h2>
              <p id="estimate-description" className="modal-step-caption">
                Step {stage + 1} of {stageLabels.length}
              </p>
            </div>
            <button
              type="button"
              className="modal-close"
              onClick={onClose}
              aria-label="Close estimate assistant"
              ref={closeButtonRef}
            >
              <X size={18} />
            </button>
          </div>

          <nav className="stepper" aria-label="Estimate progress">
            {stageLabels.map((label, index) => {
              const status = index === stage ? 'current' : index < stage ? 'complete' : 'upcoming'
              return (
                <button
                  key={label}
                  type="button"
                  className={`stepper-step is-${status}`}
                  onClick={() => status !== 'upcoming' && goToStage(index)}
                  disabled={status === 'upcoming'}
                  aria-current={status === 'current' ? 'step' : undefined}
                >
                  <span className="stepper-dot">{status === 'complete' ? <Check size={12} /> : index + 1}</span>
                  <span className="stepper-label">{label}</span>
                </button>
              )
            })}
          </nav>

          <div className="stepper-mobile">
            <p className="stepper-mobile-caption">
              Step {stage + 1} of {stageLabels.length} · {stageLabels[stage]}
            </p>
            <div className="stepper-progress-track">
              <div
                className="stepper-progress-fill"
                style={{ width: `${((stage + 1) / stageLabels.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-scroll">
            {stage === 0 && (
              <section className="assistant-stage">
                <div className="stage-heading">
                  <h3>Which service fits best?</h3>
                  <p>Choose the residential service you want to discuss.</p>
                </div>
                <div className="choice-grid">
                  {serviceCards.map(({ service, title, description, icon: Icon }) => {
                    const selected = request.service === service
                    return (
                      <button
                        key={service}
                        type="button"
                        className={selected ? 'choice-card is-selected' : 'choice-card'}
                        onClick={() => handleServiceSelection(service)}
                        aria-pressed={selected}
                      >
                        {selected && (
                          <span className="choice-check" aria-hidden="true">
                            <Check size={14} />
                          </span>
                        )}
                        <Icon size={18} />
                        <strong>{title}</strong>
                        <span>{description}</span>
                      </button>
                    )
                  })}
                </div>
                {errors.service && (
                  <p className="field-error" role="alert">
                    {errors.service}
                  </p>
                )}
              </section>
            )}

            {stage === 1 && (
              <section className="assistant-stage">
                <div className="stage-heading">
                  <h3>Tell us about the project</h3>
                  <p>Project type changes based on the service you selected.</p>
                </div>
                <div className="field-grid">
                  <label className="field">
                    <span>
                      Project type <em className="required-mark">Required</em>
                    </span>
                    <select
                      value={request.projectType}
                      onChange={(event) => updateRequest('projectType', event.target.value as ProjectTypeOption | '')}
                    >
                      <option value="">Select a project type</option>
                      {projectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <small className="field-error" role="alert">
                        {errors.projectType}
                      </small>
                    )}
                  </label>
                  <label className="field field-full">
                    <span>
                      Project details <em className="required-mark">Required</em>
                    </span>
                    <textarea
                      rows={5}
                      value={request.projectDetails}
                      onChange={(event) => updateRequest('projectDetails', event.target.value)}
                      placeholder="Share what is happening, what part of the home is involved, and anything else we should know."
                    />
                    {errors.projectDetails && (
                      <small className="field-error" role="alert">
                        {errors.projectDetails}
                      </small>
                    )}
                  </label>
                </div>
              </section>
            )}

            {stage === 2 && (
              <section className="assistant-stage">
                <div className="stage-heading">
                  <h3>Where is the property located?</h3>
                  <p>ZIP code is required. Address is optional at this stage.</p>
                </div>
                <div className="field-grid">
                  <label className="field">
                    <span>
                      Property type <em className="required-mark">Required</em>
                    </span>
                    <select
                      value={request.propertyType}
                      onChange={(event) => updateRequest('propertyType', event.target.value as PropertyTypeOption | '')}
                    >
                      <option value="">Select property type</option>
                      <option value="single-family">Single-family home</option>
                      <option value="townhome">Townhome</option>
                      <option value="ranch">Ranch or one-level home</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.propertyType && (
                      <small className="field-error" role="alert">
                        {errors.propertyType}
                      </small>
                    )}
                  </label>
                  <label className="field">
                    <span>
                      ZIP code <em className="required-mark">Required</em>
                    </span>
                    <input
                      inputMode="numeric"
                      maxLength={5}
                      value={request.zipCode}
                      onChange={(event) => updateRequest('zipCode', event.target.value.replace(/\D/g, '').slice(0, 5))}
                      placeholder="37040"
                    />
                    {errors.zipCode && (
                      <small className="field-error" role="alert">
                        {errors.zipCode}
                      </small>
                    )}
                  </label>
                  <label className="field field-full">
                    <span>
                      Street address <em className="optional-mark">Optional</em>
                    </span>
                    <input
                      value={request.address}
                      onChange={(event) => updateRequest('address', event.target.value)}
                      placeholder="123 Main Street"
                    />
                  </label>
                  <label className="field field-full">
                    <span>
                      Timeline <em className="required-mark">Required</em>
                    </span>
                    <select
                      value={request.timeline}
                      onChange={(event) => updateRequest('timeline', event.target.value as TimelineOption | '')}
                    >
                      <option value="">Select a timeline</option>
                      <option value="asap">As soon as possible</option>
                      <option value="1-3-months">Within 1 to 3 months</option>
                      <option value="3-6-months">Within 3 to 6 months</option>
                      <option value="planning">Just planning ahead</option>
                    </select>
                    {errors.timeline && (
                      <small className="field-error" role="alert">
                        {errors.timeline}
                      </small>
                    )}
                  </label>
                </div>
              </section>
            )}

            {stage === 3 && (
              <section className="assistant-stage">
                <div className="stage-heading">
                  <h3>Add photos if you want to</h3>
                  <p>Photos are optional and help give context before we follow up.</p>
                </div>
                <div
                  className={isDragActive ? 'upload-panel is-dragging' : 'upload-panel'}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload size={22} />
                  <strong>Drag photos here</strong>
                  <span>or select files from your device. Photos are optional.</span>
                  <button
                    type="button"
                    className="secondary-button upload-browse-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Choose Photos
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="visually-hidden-input"
                    onChange={handlePhotoInputChange}
                    aria-label="Choose project photos"
                  />
                </div>
                <div className="photo-list" aria-live="polite">
                  {request.photoNames.length === 0 ? (
                    <p>No photos added yet.</p>
                  ) : (
                    request.photoNames.map((name) => <span key={name}>{name}</span>)
                  )}
                </div>
              </section>
            )}

            {stage === 4 && (
              <section className="assistant-stage">
                <div className="stage-heading">
                  <h3>How should we reach you?</h3>
                  <p>Name is required, plus at least one way to reach you.</p>
                </div>
                <div className="field-grid">
                  <label className="field field-full">
                    <span>
                      Full name <em className="required-mark">Required</em>
                    </span>
                    <input
                      value={request.name}
                      onChange={(event) => updateRequest('name', event.target.value)}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <small className="field-error" role="alert">
                        {errors.name}
                      </small>
                    )}
                  </label>
                </div>

                <div className="contact-pref-group" role="group" aria-label="Preferred contact method">
                  <span className="field-label-standalone">
                    Preferred contact method <em className="required-mark">Required</em>
                  </span>
                  <div className="pref-options">
                    {(['phone-text', 'email', 'either'] as ContactPreference[]).map((pref) => (
                      <button
                        key={pref}
                        type="button"
                        className={request.contactPreference === pref ? 'pref-chip is-selected' : 'pref-chip'}
                        aria-pressed={request.contactPreference === pref}
                        onClick={() => updateRequest('contactPreference', pref)}
                      >
                        {contactLabels[pref]}
                      </button>
                    ))}
                  </div>
                  {errors.contactPreference && (
                    <small className="field-error" role="alert">
                      {errors.contactPreference}
                    </small>
                  )}
                </div>

                <div className="field-grid">
                  <label className="field">
                    <span>
                      Phone <em className={`${phoneRequirement}-mark`}>{requirementLabel[phoneRequirement]}</em>
                    </span>
                    <input
                      type="tel"
                      value={request.phone}
                      onChange={(event) => updateRequest('phone', event.target.value)}
                      placeholder="(931) 980-6224"
                    />
                    {errors.phone && (
                      <small className="field-error" role="alert">
                        {errors.phone}
                      </small>
                    )}
                  </label>
                  <label className="field">
                    <span>
                      Email <em className={`${emailRequirement}-mark`}>{requirementLabel[emailRequirement]}</em>
                    </span>
                    <input
                      type="email"
                      value={request.email}
                      onChange={(event) => updateRequest('email', event.target.value)}
                      placeholder="name@example.com"
                    />
                    {errors.email && (
                      <small className="field-error" role="alert">
                        {errors.email}
                      </small>
                    )}
                  </label>
                </div>
              </section>
            )}

            {stage === 5 && (
              <section className="assistant-stage">
                <div className="stage-heading">
                  <h3>Review before sending</h3>
                  <p>Check the details below, then submit your request.</p>
                </div>
                <div className="review-groups">
                  {reviewGroups.map((group) => (
                    <div className="review-group" key={group.title}>
                      <div className="review-group-header">
                        <h4>{group.title}</h4>
                        <button type="button" className="review-edit-link" onClick={() => goToStage(group.stage)}>
                          Edit
                        </button>
                      </div>
                      <div className="review-grid">
                        {group.rows.map(([label, value]) => (
                          <div key={label} className="review-row">
                            <span>{label}</span>
                            <strong>{value}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {submissionState === 'error' && (
                  <p className="submission-message is-error" role="alert">
                    {submissionError}
                  </p>
                )}
                {submissionState === 'success' && submissionResult && (
                  <div className="submission-message is-success" role="status">
                    <strong>Request submitted.</strong>
                    <span>
                      {submissionResult.message} Reference number: <b>{submissionResult.referenceNumber}</b>
                    </span>
                  </div>
                )}
              </section>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-button"
              onClick={() => moveStage('back')}
              disabled={stage === 0 || submissionState === 'loading'}
            >
              Back
            </button>
            {stage < stageLabels.length - 1 ? (
              <button type="button" className="primary-button" onClick={() => moveStage('next')}>
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button type="submit" className="primary-button" disabled={submissionState === 'loading' || submissionState === 'success'}>
                {submissionState === 'loading' ? 'Submitting...' : submissionState === 'success' ? 'Submitted' : 'Submit request'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<ServiceOption | ''>('')
  const [openFaq, setOpenFaq] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function openAssistant(service?: ServiceOption) {
    setSelectedService(service ?? '')
    setAssistantOpen(true)
    setMenuOpen(false)
  }

  function closeAssistant() {
    setAssistantOpen(false)
  }

  function scrollToTop(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <main className="page-shell" id="top">
        <header className={isScrolled ? 'site-header is-scrolled' : 'site-header'}>
          <div className="container header-inner">
            <a className="site-logo" href="#top" aria-label="Diamond Roofing home, scroll to top" onClick={scrollToTop}>
              <img src={images.logo} alt="Diamond Roofing LLC logo" />
            </a>

            <button
              type="button"
              className="mobile-toggle"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="site-navigation"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <nav id="site-navigation" className={menuOpen ? 'site-nav is-open' : 'site-nav'} aria-label="Main navigation">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="header-actions">
              <a href="tel:9319806224" className="header-phone">
                <Phone size={15} />
                <span>(931) 980-6224</span>
              </a>
              <button type="button" className="header-cta" onClick={() => openAssistant()}>
                Request an Estimate
              </button>
            </div>
          </div>
        </header>

        <section className="hero-section" aria-labelledby="hero-title">
          <img className="hero-image" src={images.hero} alt="" aria-hidden="true" />
          <div className="hero-overlay" />
          <div className="container hero-content">
            <p className="section-label hero-label">Residential Roofing • Repairs • Remodeling</p>
            <h1 id="hero-title">Built to protect what matters.</h1>
            <p className="hero-copy">
              Residential roofing, repairs, siding, remodeling, and exterior improvements for homeowners in Clarksville,
              Tennessee and surrounding communities.
            </p>
            <div className="hero-actions">
              <button type="button" className="primary-button" onClick={() => openAssistant()}>
                Request an Estimate <ArrowRight size={16} />
              </button>
              <a className="secondary-button secondary-button-light" href="tel:9319806224">
                <Phone size={16} /> Call (931) 980-6224
              </a>
            </div>
            <p className="hero-service-area">
              Serving Clarksville, Springfield, Nashville, Dickson, and nearby Kentucky communities.
            </p>
          </div>
        </section>

        <section className="section section-services" id="services">
          <div className="container">
            <div className="section-intro">
              <div>
                <p className="section-label">What we do</p>
                <h2>Residential services, organized clearly</h2>
              </div>
              <p>
                One team for the exterior and interior projects that protect and improve your home, with a focused
                residential approach.
              </p>
            </div>

            <div className="service-grid">
              {serviceCards.map(({ service, icon: Icon, title, description }) => (
                <article className="service-card" key={service}>
                  <div className="service-icon">
                    <Icon size={18} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <button type="button" className="text-link" onClick={() => openAssistant(service)}>
                    Request estimate <ArrowRight size={15} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-projects" id="projects">
          <div className="container">
            <div className="section-intro stacked">
              <div>
                <p className="section-label">Project gallery</p>
                <h2>Recent residential work</h2>
              </div>
              <p>A look at projects across roofing, repairs, siding, framing, and exterior work for homeowners in the Clarksville area.</p>
            </div>

            <div className="project-grid">
              {projects.map((project) => (
                <figure className="project-card" key={project.title}>
                  <img src={project.image} alt={project.alt} />
                  <figcaption>
                    <span>{project.category}</span>
                    <strong>{project.title}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>

            <div className="section-cta-row">
              <button type="button" className="dark-button" onClick={() => openAssistant()}>
                Start your project request
              </button>
            </div>
          </div>
        </section>

        {googleReviews.length > 0 && (
          <section className="section section-reviews" id="reviews">
            <div className="container">
              <div className="section-intro centered">
                <div>
                  <p className="section-label">Google Reviews</p>
                  <h2>What homeowners are saying</h2>
                </div>
              </div>
              <div className="review-cards">
                {googleReviews.map((review) => (
                  <article className="google-review-card" key={`${review.author}-${review.date}`}>
                    <div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>
                      {Array.from({ length: review.rating }).map((_, index) => (
                        <Star key={index} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <p>{review.text}</p>
                    <div className="review-meta">
                      <strong>{review.author}</strong>
                      <span>{review.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="section section-process" id="process">
          <div className="container">
            <div className="section-intro stacked">
              <div>
                <p className="section-label">How it works</p>
                <h2>A clear, low-pressure process</h2>
              </div>
              <p>From first message to next steps, here&apos;s what to expect when you reach out.</p>
            </div>

            <div className="process-grid">
              {processSteps.map((step) => (
                <article className="process-card" key={step.number}>
                  <span className="process-number">{step.number}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-expect">
          <div className="container expect-panel">
            <div className="expect-media">
              <img src={images.hero} alt="Aerial view of a completed residential roofing project" />
            </div>
            <div className="expect-content">
              <p className="section-label">What Homeowners Can Expect</p>
              <h2>Care and clarity at every step</h2>
              <p>These are the standards we work toward on every residential project.</p>
              <div className="expect-list">
                {whatToExpect.map(({ icon: Icon, title, description }) => (
                  <article className="expect-item" key={title}>
                    <div className="value-icon">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section section-service-area" id="service-area">
          <div className="container service-area-panel">
            <div>
              <p className="section-label">Service Area</p>
              <h2>Based in Clarksville, Tennessee</h2>
              <p>
                We serve Clarksville and the surrounding communities, including Springfield, Nashville, Dickson, and
                nearby Kentucky neighborhoods.
              </p>
              <ul className="service-area-list">
                <li>
                  <MapPin size={16} /> Clarksville, TN
                </li>
                <li>
                  <MapPin size={16} /> Springfield, Nashville, and Dickson
                </li>
                <li>
                  <MapPin size={16} /> Nearby Kentucky communities
                </li>
              </ul>
            </div>
            <div className="service-check-card">
              <h3>Check your area</h3>
              <p>Enter your ZIP code to start a request. We&apos;ll ask for a few project details next.</p>
              <button type="button" className="primary-button" onClick={() => openAssistant()}>
                Continue <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <section className="section section-faq">
          <div className="container faq-shell">
            <div className="section-intro centered">
              <div>
                <p className="section-label">FAQ</p>
                <h2>Questions before you reach out</h2>
              </div>
            </div>

            <div className="faq-list">
              {faqs.map((item, index) => (
                <FaqItem key={item.question} item={item} isOpen={openFaq === index} onToggle={() => setOpenFaq(openFaq === index ? -1 : index)} />
              ))}
            </div>
          </div>
        </section>

        <section className="section final-cta" id="contact">
          <div className="container final-cta-panel">
            <h2>Ready to protect what matters?</h2>
            <p>Start with the Estimate Assistant — share your project and we&apos;ll take it from there.</p>
            <div className="hero-actions final-actions">
              <button type="button" className="primary-button" onClick={() => openAssistant()}>
                Request an Estimate <ArrowRight size={16} />
              </button>
              <a className="secondary-button secondary-button-light" href="tel:9319806224">
                <Phone size={16} /> (931) 980-6224
              </a>
            </div>
          </div>
        </section>

        <footer className="site-footer">
          <div className="container footer-inner">
            <a className="footer-logo" href="#top" aria-label="Back to top" onClick={scrollToTop}>
              <img src={images.logo} alt="Diamond Roofing LLC logo" />
            </a>
            <div className="footer-copy">
              <p>Diamond Roofing LLC</p>
              <span>Residential roofing, repairs, siding, framing, remodeling, decks, and fencing in Clarksville, TN.</span>
            </div>
            <div className="footer-links">
              <a href="tel:9319806224">
                <Phone size={15} /> (931) 980-6224
              </a>
              <a href="mailto:thediamondroofing160426@gmail.com">
                <Mail size={15} /> thediamondroofing160426@gmail.com
              </a>
            </div>
          </div>
        </footer>
      </main>

      <EstimateAssistant isOpen={assistantOpen} onClose={closeAssistant} initialService={selectedService} />
    </>
  )
}
