import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, School, GraduationCap, Users, Phone, ChevronDown, X } from 'lucide-react';
import { collection, addDoc } from 'firebase/firestore';
import db from "../firebase";

interface TeamMember {
  name: string;
  rollNo: string;
  branch: string;
  phone: string;
}

interface FormData {
  name: string;
  rollNo: string;
  branch: string;
  college: string;
  phone: string;
  email: string;
  selectedEvents: string[];
  teamMembers: TeamMember[];
}

const branches = [
  'CSE', 'CSE-DS', 'CSE-AIML', 'AIML', 'ECE', 'EEE',
  'Mechanical', 'Civil', 'IT', 'MBA'
];

// Team size rules based on the Events component
const teamEventRules: { [key: string]: { min: number; max: number } } = {
  'WESTERN/FOLK DANCE': { min: 4, max: 8 }, // Group performance: 4 to 8 members
  'SKIT': { min: 3, max: 6 },
  'FLASHMOB': { min: 10, max: 20 },
  'TREASURE HUNT': { min: 1, max: 3 },
  'RANGOLI': { min: 2, max: 2 },
  'BEST OUT OF WASTE': { min: 2, max: 2 },
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    rollNo: '',
    branch: '',
    college: '',
    phone: '',
    email: '',
    selectedEvents: [],
    teamMembers: []
  });

  const [showTeamFields, setShowTeamFields] = useState(false);
  const [teamSize, setTeamSize] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const teamEvents = Object.keys(teamEventRules);
  const soloEvents = [
    'MR.SUNRISE',
    'MISS.SUNRISE',
    'CLASSICAL DANCE (SOLO)',
    'SINGING (SOLO/LIGHT VOCALS)',
    'MEHENDI',
    'PHOTOGRAPHY',
    'INSTA REELS',
    'SPOT PAINTING'
  ];

  // Show team fields if a team event is selected
  useEffect(() => {
    const hasTeamEvent = formData.selectedEvents.some(event => teamEvents.includes(event));
    setShowTeamFields(hasTeamEvent);
    if (!hasTeamEvent) {
      setTeamSize(0);
      setFormData(prev => ({ ...prev, teamMembers: [] }));
    }
  }, [formData.selectedEvents]);

  // Update team members array when team size changes
  useEffect(() => {
    if (teamSize > 0) {
      setFormData(prev => ({
        ...prev,
        teamMembers: Array(teamSize).fill({
          name: '',
          rollNo: '',
          branch: '',
          phone: ''
        })
      }));
    }
  }, [teamSize]);

  // Handle input changes for personal details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  // Handle event selection
  const handleEventSelection = (event: string) => {
    setFormData(prev => ({
      ...prev,
      selectedEvents: prev.selectedEvents.includes(event)
        ? prev.selectedEvents.filter(e => e !== event)
        : [...prev.selectedEvents, event]
    }));
    setErrors(prev => ({ ...prev, events: '', teamSize: '' }));
  };

  // Handle team member details changes
  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map((member, i) =>
        i === index ? { ...member, [field]: value } : member
      )
    }));
    setErrors(prev => ({ ...prev, [`teamMember${field}${index}`]: '' }));
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Personal details validation
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.rollNo) newErrors.rollNo = 'Roll number is required';
    if (!formData.branch) newErrors.branch = 'Branch is required';
    if (!formData.college) newErrors.college = 'College is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';

    // Event selection validation
    if (formData.selectedEvents.length === 0) newErrors.events = 'At least one event must be selected';

    // Team size validation for team events
    if (showTeamFields) {
      const selectedTeamEvents = formData.selectedEvents.filter(event => teamEvents.includes(event));
      if (selectedTeamEvents.length > 0) {
        const eventRule = teamEventRules[selectedTeamEvents[0]]; // Use the first team event's rules
        if (teamSize < eventRule.min || teamSize > eventRule.max) {
          newErrors.teamSize = `Team size must be between ${eventRule.min} and ${eventRule.max} for ${selectedTeamEvents[0]}`;
        }
      }
    }

    // Team member details validation
    if (teamSize > 0) {
      formData.teamMembers.forEach((member, index) => {
        if (!member.name) newErrors[`teamMemberName${index}`] = 'Name is required';
        if (!member.rollNo) newErrors[`teamMemberRollNo${index}`] = 'Roll number is required';
        if (!member.branch) newErrors[`teamMemberBranch${index}`] = 'Branch is required';
        if (!member.phone) newErrors[`teamMemberPhone${index}`] = 'Phone number is required';
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const registrationsRef = collection(db, 'registrations');
      await addDoc(registrationsRef, {
        ...formData,
        timestamp: new Date(),
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          rollNo: '',
          branch: '',
          college: '',
          phone: '',
          email: '',
          selectedEvents: [],
          teamMembers: []
        });
        setTeamSize(0);
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred while submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden" id="register">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(0,0,0,1))]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-50 blur-xl animate-pulse" />
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Event Registration
            </span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/5 backdrop-blur-lg rounded-xl p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Personal Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Roll Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Roll Number</label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your roll number"
                />
              </div>
              {errors.rollNo && <p className="text-red-500 text-sm mt-1">{errors.rollNo}</p>}
            </div>

            {/* Branch */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Branch</label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select Branch</option>
                  {branches.map(branch => (
                    <option key={branch} value={branch} className="bg-gray-800">
                      {branch}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              {errors.branch && <p className="text-red-500 text-sm mt-1">{errors.branch}</p>}
            </div>

            {/* College */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">College</label>
              <div className="relative">
                <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your college name"
                />
              </div>
              {errors.college && <p className="text-red-500 text-sm mt-1">{errors.college}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
          </div>

          {/* Event Selection */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-purple-400">Select Events</h3>
            {errors.events && <p className="text-red-500 text-sm mt-1">{errors.events}</p>}
            
            <div className="space-y-4">
              {/* Solo Events */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Solo Events</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {soloEvents.map(event => (
                    <button
                      key={event}
                      type="button"
                      onClick={() => handleEventSelection(event)}
                      className={`p-3 rounded-lg text-sm text-left transition-colors ${
                        formData.selectedEvents.includes(event)
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                          : 'bg-white/5 border-gray-600 text-gray-300 hover:bg-white/10'
                      } border`}
                    >
                      {event}
                    </button>
                  ))}
                </div>
              </div>

              {/* Team Events */}
              <div>
                <h4 className="text-sm font-medium text-gray-300 mb-2">Team Events</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {teamEvents.map(event => (
                    <button
                      key={event}
                      type="button"
                      onClick={() => handleEventSelection(event)}
                      className={`p-3 rounded-lg text-sm text-left transition-colors ${
                        formData.selectedEvents.includes(event)
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                          : 'bg-white/5 border-gray-600 text-gray-300 hover:bg-white/10'
                      } border`}
                    >
                      {event}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Team Members */}
          <AnimatePresence>
            {showTeamFields && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 overflow-hidden"
              >
                <h3 className="text-xl font-semibold text-purple-400">Team Details</h3>
                
                {/* Team Size Selection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Number of Team Members</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(Number(e.target.value))}
                      required
                      className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="0">Select Team Size</option>
                      {[...Array(20)].map((_, i) => (
                        <option key={i + 1} value={i + 1} className="bg-gray-800">
                          {i + 1} Members
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                  {errors.teamSize && <p className="text-red-500 text-sm mt-1">{errors.teamSize}</p>}
                </div>

                {/* Team Member Fields */}
                <AnimatePresence>
                  {teamSize > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {formData.teamMembers.map((_, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg space-y-4">
                          <h4 className="text-lg font-medium text-purple-400">
                            Team Member {index + 1}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-300">Name</label>
                              <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="text"
                                  value={formData.teamMembers[index].name}
                                  onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                                  required
                                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  placeholder="Enter member name"
                                />
                              </div>
                              {errors[`teamMemberName${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`teamMemberName${index}`]}</p>}
                            </div>

                            {/* Roll Number */}
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-300">Roll Number</label>
                              <div className="relative">
                                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="text"
                                  value={formData.teamMembers[index].rollNo}
                                  onChange={(e) => handleTeamMemberChange(index, 'rollNo', e.target.value)}
                                  required
                                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  placeholder="Enter roll number"
                                />
                              </div>
                              {errors[`teamMemberRollNo${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`teamMemberRollNo${index}`]}</p>}
                            </div>

                            {/* Branch */}
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-300">Branch</label>
                              <div className="relative">
                                <School className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                  value={formData.teamMembers[index].branch}
                                  onChange={(e) => handleTeamMemberChange(index, 'branch', e.target.value)}
                                  required
                                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white appearance-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                >
                                  <option value="">Select Branch</option>
                                  {branches.map(branch => (
                                    <option key={branch} value={branch} className="bg-gray-800">
                                      {branch}
                                    </option>
                                  ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                              </div>
                              {errors[`teamMemberBranch${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`teamMemberBranch${index}`]}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-2">
                              <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                              <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                  type="tel"
                                  value={formData.teamMembers[index].phone}
                                  onChange={(e) => handleTeamMemberChange(index, 'phone', e.target.value)}
                                  required
                                  className="w-full bg-white/5 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                  placeholder="Enter phone number"
                                />
                              </div>
                              {errors[`teamMemberPhone${index}`] && <p className="text-red-500 text-sm mt-1">{errors[`teamMemberPhone${index}`]}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || formData.selectedEvents.length === 0}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium
                hover:from-purple-600 hover:to-blue-600 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </div>
        </motion.form>

        {/* Success Message */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
            >
              Registration successful! Thank you for participating.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RegistrationForm;