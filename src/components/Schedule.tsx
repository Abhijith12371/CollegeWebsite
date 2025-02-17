import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Phone, Mail, School, Award, 
  ChevronRight, X, GraduationCap, Calendar, Star, Music2, MapPin, BookOpen
} from 'lucide-react';

interface Coordinator {
  name: string;
  phone: string;
  email?: string;
  roll_no?: string;
  class?: string;
}

interface EventDetails {
  name: string;
  venue?: string; // Optional field
  rules?: string[]; // Optional field
  coordinator: {
    name: string;
    phone: string;
  };
}

interface Department {
  faculty_coordinator: Coordinator | { name: string; phone: string; };
  faculty_coordinators?: Coordinator[];
  student_coordinator: Coordinator;
  events: EventDetails[];
}

interface ScheduleData {
  departments: Record<string, Department>;
}

const Schedule = () => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  
  const scheduleData: ScheduleData = {
    "departments": {
      "FED-1": {
        "student_coordinator": {
          "name": "M.HOMESH",
          "roll_no": "24KN1A42B3",
          "class": "CSM -B",
          "phone": "7013028648"
        },
        "faculty_coordinator": {
          "name": "Dr B Sri Hari Rao",
          "phone": "9293786399"
        },
        "events": [
          {
            name: "Math Puzzle Hunt",
            venue: "Main Hall",
            rules: [
              "The first puzzle file has no password and can be accessed directly.",
              "The solution to each question leads to the password for the next file.",
              "Solving the puzzle is the only way to continue and unlock the password for the next file.",
              "The file may contain: (a) The Magic Number Trick, (b) The Birthday Paradox, (c) Mental Multiplication, (d) Basic Calculations, (e) Pattern Recognition, (f) Logic and Reasoning Problems, (g) Algebraic Equations."
            ],
            coordinator: {
              name: "Dr. G. Adilakshmi",
              phone: "9985398080"
            }
          },
          {
            name: "Declamation",
            venue: "Auditorium",
            rules: [
              "Individual Participation.",
              "Participants must deliver a portion of a speech previously delivered by a great personality.",
              "The goal is to convey a message with clarity, emotion, and persuasiveness.",
              "Time limit: 3 minutes."
            ],
            coordinator: {
              name: "Mrs. V. Navata",
              phone: "7893838177"
            }
          }
        ]
      },
      "FED-2": {
        "faculty_coordinator": {
          "name": "Dr. G. Srinivasa Rao",
          "phone": "9866391041"
        },
        "student_coordinator": {
          "name": "R Madhu Venkata Sai Ganesh",
          "phone": "9666485544"
        },
        "events": [
          {
            name: "Rebus Puzzles in Physics",
            venue: "Physics Lab",
            rules: [
              "Teams of 2 members.",
              "Solve rebus puzzles related to physics concepts.",
              "Time limit: 20 minutes."
            ],
            coordinator: {
              name: "Dr. G. Srinivasa Rao",
              phone: "9866391041"
            }
          },
          {
            name: "Poster Presentation - Role of Advanced Materials in Engineering",
            venue: "Chemistry Lab",
            rules: [
              "Individual or team of 2.",
              "Poster size: A1 (594 x 841 mm).",
              "Present for 5 minutes, followed by Q&A."
            ],
            coordinator: {
              name: "Dr. G. Srinivasa Rao",
              phone: "9866391041"
            }
          }
        ]
      },
      "CSE": {
        "faculty_coordinators": [
          { "name": "Mr.N.V.Satyanarayana", "phone": "9885190561", "email": "satya4satya@gmail.com" },
          { "name": "Mr.P.Somaraju", "phone": "9703130583", "email": "somaraju.p@nriit.edu.in" }
        ],
        "student_coordinator": {
          "name": "Mr.M.Sravan",
          "phone": "8317634794",
          "email": "sravanmandava1126@gmail.com"
        },
        "events": [
          {
            name: "LOGO QUIZ",
            venue: "192 Lab",
            rules: [
              "Only 2 persons per team.",
              "Every team should bring a pen."
            ],
            coordinator: {
              name: "Mr. M.V.P. Uma Maheswara Rao",
              phone: "7382745151"
            }
          },
          {
            name: "BUG WAR",
            venue: "DBMS Lab",
            rules: [
              "Phones and smartwatches are not allowed."
            ],
            coordinator: {
              name: "Mrs. CH. N. Santha Kumari",
              phone: "7207444601"
            }
          },
          {
            name: "AVISHKAAR ANVESHAN",
            venue: "1214 Lab",
            rules: [
              "Posters related to CSE topics such as AI, ML, Cloud Computing, Data Science, Blockchain, or any emerging technology."
            ],
            coordinator: {
              name: "Dr. G. Shobana",
              phone: "8985423344"
            }
          },
          {
            name: "CODE SANKALP",
            venue: "WT Lab",
            rules: [
              "Only 2 persons per team.",
              "Phones and smartwatches are not allowed."
            ],
            coordinator: {
              name: "Mr. A. Tarak Ram",
              phone: "8106356348"
            }
          }
        ]
      },
      "IT": {
        "faculty_coordinator": {
          "name": "Smt.G.Baleswari",
          "phone": "8500275537"
        },
        "student_coordinator": {
          "name": "T.Revanth",
          "phone": "8886168440"
        },
        "events": [
          {
            name: "INNOVISTAS",
            venue: "Room 3205",
            rules: [
              "Only 2 persons per team.",
              "Presentation time: 8 minutes + 2 minutes for queries.",
              "Candidates must submit one hard copy at the time of presentation.",
              "All students must ensure a fair and professional environment."
            ],
            coordinator: {
              name: "Mrs. K. Vijitha",
              phone: "7997605390"
            }
          },
          {
            name: "Creative Exhibit",
            venue: "Room 3204",
            rules: [
              "Maximum of 3 participants per project/model.",
              "A team member can participate in only one project.",
              "Projects must be in working condition.",
              "Participants must bring their own accessories.",
              "Submit a hard copy of the abstract during the presentation."
            ],
            coordinator: {
              name: "Mr. N. Narasimha Rao",
              phone: "8184972436"
            }
          },
          {
            name: "Bytes and Bits Quiz",
            venue: "Room 3304",
            rules: [
              "Team comprises of 2 members.",
              "Each team would be given a set of 25 objective-type questions.",
              "Time limit: 15 minutes.",
              "Only 5 teams would be selected for the FINAL ROUND.",
              "In case of a tie, 3 additional questions would be asked."
            ],
            coordinator: {
              name: "Mr. P. Kiran Babu",
              phone: "9989643958"
            }
          },
          {
            name: "Next Gen Ideas",
            venue: "Room 3303",
            rules: [
              "The poster size should be 20 x 30 inches.",
              "Maximum of 2 persons per presentation.",
              "Participants must bring their own materials.",
              "Judges/reviewers and audience may pose questions.",
              "Ensure a fair and professional environment."
            ],
            coordinator: {
              name: "Ms. M. Tejaswini",
              phone: "8179883362"
            }
          }
        ]
      },
      "CSE-DS": {
        "faculty_coordinator": {
          "name": "Mr. B. Phanindra Kumar",
          "phone": "9014260174"
        },
        "student_coordinator": {
          "name": "K.Sripathi Rao",
          "phone": "8328109217"
        },
        "events": [
          {
            name: "Technical Quiz",
            venue: "Data Science Lab",
            rules: [
              "Teams of 2 members.",
              "20 multiple-choice questions.",
              "Time limit: 15 minutes."
            ],
            coordinator: {
              name: "Mr. B. Phanindra Kumar",
              phone: "9014260174"
            }
          },
          {
            name: "Blind Coding",
            venue: "Programming Lab",
            rules: [
              "Participants must write code without seeing the screen.",
              "Time limit: 10 minutes."
            ],
            coordinator: {
              name: "Mr. B. Phanindra Kumar",
              phone: "9014260174"
            }
          }
        ]
      },
      "CSE-AIML": {
        "faculty_coordinator": {
          "name": "Mr.Rajenra",
          "phone": "9494367464"
        },
        "student_coordinator": {
          "name": "Mr. N.Bhogeeswar",
          "phone": "8309298044"
        },
        "events": [
          {
            name: "Paper Presentation",
            venue: "AIML Lab",
            rules: [
              "Individual or team of 2.",
              "Presentation time: 10 minutes.",
              "Topics related to AI/ML."
            ],
            coordinator: {
              name: "Mr.Rajenra",
              phone: "9494367464"
            }
          },
          {
            name: "Poster Presentation",
            venue: "AIML Lab",
            rules: [
              "Poster size: A1 (594 x 841 mm).",
              "Present for 5 minutes, followed by Q&A."
            ],
            coordinator: {
              name: "Mr.Rajenra",
              phone: "9494367464"
            }
          }
        ]
      },
      "AIML": {
        "faculty_coordinator": {
          "name": "Dr. Y. Arpitha",
          "phone": "9493468888"
        },
        "student_coordinator": {
          "name": "K. Sai Harsha",
          "phone": "9985584854"
        },
        "events": [
          {
            name: "Code & Quest",
            venue: "AIML Lab",
            rules: [
              "Teams of 2 members.",
              "Solve coding challenges related to AI/ML.",
              "Time limit: 30 minutes."
            ],
            coordinator: {
              name: "Dr. Y. Arpitha",
              phone: "9493468888"
            }
          },
          {
            name: "Ideathon",
            venue: "AIML Lab",
            rules: [
              "Individual or team of 2.",
              "Present innovative ideas related to AI/ML.",
              "Time limit: 10 minutes."
            ],
            coordinator: {
              name: "Dr. Y. Arpitha",
              phone: "9493468888"
            }
          }
        ]
      },
      "ECE": {
        "faculty_coordinator": {
          "name": "Gottipati Srinivas Babu",
          "phone": "9492273639",
          "email": "srinivasababug@nriit.edu.in"
        },
        "student_coordinator": {
          "name": "K Maanas Reddy",
          "phone": "9515739145",
          "email": "maanasr116@gmail.com"
        },
        "events": [
          {
            name: "Technical Quiz",
            venue: "ECE Lab",
            rules: [
              "Teams of 2 members.",
              "20 multiple-choice questions.",
              "Time limit: 15 minutes."
            ],
            coordinator: {
              name: "Gottipati Srinivas Babu",
              phone: "9492273639"
            }
          },
          {
            name: "Technical Paper Presentations",
            venue: "ECE Seminar Hall",
            rules: [
              "Individual or team of 2.",
              "Presentation time: 10 minutes.",
              "Topics related to ECE."
            ],
            coordinator: {
              name: "Gottipati Srinivas Babu",
              phone: "9492273639"
            }
          }
        ]
      },
      "EEE": {
        "faculty_coordinator": {
          "name": "Mr.R.Raghu Nadha Sastry",
          "phone": "9490337572"
        },
        "student_coordinator": {
          "name": "MATTA BALA VENKATA SAI",
          "phone": "7207219186"
        },
        "events": [
          {
            name: "Poster Presentation",
            venue: "EEE Lab",
            rules: [
              "Poster size: A1 (594 x 841 mm).",
              "Present for 5 minutes, followed by Q&A."
            ],
            coordinator: {
              name: "Mr.R.Raghu Nadha Sastry",
              phone: "9490337572"
            }
          },
          {
            name: "Paper Presentation",
            venue: "EEE Seminar Hall",
            rules: [
              "Individual or team of 2.",
              "Presentation time: 10 minutes.",
              "Topics related to EEE."
            ],
            coordinator: {
              name: "Mr.R.Raghu Nadha Sastry",
              phone: "9490337572"
            }
          }
        ]
      },
      "Mechanical": {
        "faculty_coordinator": {
          "name": "Mrs. CH. Srilatha",
          "phone": "8985140500",
          "email": "srilatha@nriit.edu.in"
        },
        "student_coordinator": {
          "name": "Mr. N. Bharath",
          "phone": "8247329390",
          "email": "bharathnaraga@gmail.com"
        },
        "events": [
          {
            name: "Technical Paper Presentation",
            venue: "Mechanical Seminar Hall",
            rules: [
              "Individual or team of 2.",
              "Presentation time: 10 minutes.",
              "Topics related to Mechanical Engineering."
            ],
            coordinator: {
              name: "Mrs. CH. Srilatha",
              phone: "8985140500"
            }
          },
          {
            name: "Project Expo",
            venue: "Mechanical Lab",
            rules: [
              "Teams of 2-3 members.",
              "Projects must be in working condition.",
              "Present for 10 minutes, followed by Q&A."
            ],
            coordinator: {
              name: "Mrs. CH. Srilatha",
              phone: "8985140500"
            }
          }
        ]
      },
      "Civil": {
        "faculty_coordinator": {
          "name": "A Sai Chandu",
          "phone": "9346799566"
        },
        "student_coordinator": {
          "name": "Santi Swaroop",
          "phone": "9573496479"
        },
        "events": [
          {
            name: "Poster Presentation",
            venue: "Civil Lab",
            rules: [
              "Poster size: A1 (594 x 841 mm).",
              "Present for 5 minutes, followed by Q&A."
            ],
            coordinator: {
              name: "A Sai Chandu",
              phone: "9346799566"
            }
          },
          {
            name: "Paper Presentation",
            venue: "Civil Seminar Hall",
            rules: [
              "Individual or team of 2.",
              "Presentation time: 10 minutes.",
              "Topics related to Civil Engineering."
            ],
            coordinator: {
              name: "A Sai Chandu",
              phone: "9346799566"
            }
          }
        ]
      },
      "MBA": {
        "faculty_coordinator": {
          "name": "Dr.K.Chinni Krishna",
          "phone": "9393363615"
        },
        "student_coordinator": {
          "name": "D. Aravind",
          "phone": "9010655815"
        },
        "events": [
          {
            name: "Young Manager",
            venue: "MBA Seminar Hall",
            rules: [
              "Individual participation.",
              "Case study analysis and presentation.",
              "Time limit: 15 minutes."
            ],
            coordinator: {
              name: "Dr.K.Chinni Krishna",
              phone: "9393363615"
            }
          },
          {
            name: "Market Makers",
            venue: "MBA Lab",
            rules: [
              "Teams of 2 members.",
              "Create a marketing strategy for a given product.",
              "Time limit: 20 minutes."
            ],
            coordinator: {
              name: "Dr.K.Chinni Krishna",
              phone: "9393363615"
            }
          }
        ]
      }
    }
  };

  const renderEvents = (events: EventDetails[]) => {
    return events.map((event, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="mb-6"
      >
        <h4 className="text-xl font-semibold mb-2 flex items-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          <Award className="w-5 h-5 mr-2 text-purple-400" />
          {event.name}
        </h4>
        {event.venue && (
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Venue: {event.venue}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <Users className="w-4 h-4 mr-2" />
          <span>Coordinator: {event.coordinator.name} ({event.coordinator.phone})</span>
        </div>
        {event.rules && (
          <div className="text-sm text-gray-400">
            <h5 className="font-semibold mb-1 flex items-center">
              <BookOpen className="w-4 h-4 mr-2" />
              Rules:
            </h5>
            <ul className="list-disc list-inside">
              {event.rules.map((rule, i) => (
                <li key={i} className="mb-1">{rule}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    ));
  };

  return (
    <section className="relative py-20 overflow-hidden" id="schedule">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(17,24,39,0.7),rgba(0,0,0,1))]" />
        
        {/* Animated circles */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`circle-${i}`}
            className="absolute rounded-full mix-blend-screen filter blur-xl"
            style={{
              background: `radial-gradient(circle, ${i === 0 ? 'rgba(147,51,234,0.3)' : i === 1 ? 'rgba(59,130,246,0.3)' : 'rgba(236,72,153,0.3)'} 0%, transparent 70%)`,
              width: `${Math.random() * 400 + 200}px`,
              height: `${Math.random() * 400 + 200}px`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Decorative icons */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 -top-10 -translate-x-1/2 w-20 h-20 opacity-20"
          >
            <Star className="absolute top-0 left-0 w-6 h-6 text-purple-400" />
            <Music2 className="absolute top-0 right-0 w-6 h-6 text-blue-400" />
            <Star className="absolute bottom-0 left-0 w-6 h-6 text-pink-400" />
            <Music2 className="absolute bottom-0 right-0 w-6 h-6 text-purple-400" />
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold relative">
            <span className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 opacity-50 blur-xl animate-pulse" />
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 text-transparent bg-clip-text">
              Department Events
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(scheduleData.departments).map(([deptName, deptData], index) => (
            <motion.div
              key={deptName}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl blur-xl group-hover:opacity-100 transition-opacity opacity-0" />
              <button
                onClick={() => setSelectedDept(deptName)}
                className="relative w-full text-left overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-6 hover:bg-white/10 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                      {deptName}
                    </h3>
                    <ChevronRight className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-gray-400 mb-2">
                    {deptData.events.length} Events
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{deptData.faculty_coordinators ? deptData.faculty_coordinators.length : 1} Coordinator(s)</span>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedDept && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedDept(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 opacity-50" />
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                      {selectedDept}
                    </h3>
                    <button
                      onClick={() => setSelectedDept(null)}
                      className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6 text-purple-400" />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Faculty Coordinators */}
                    <div>
                      <h4 className="text-xl font-semibold mb-3 flex items-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        <GraduationCap className="w-5 h-5 mr-2 text-purple-400" />
                        Faculty Coordinator(s)
                      </h4>
                      <div className="space-y-3">
                        {scheduleData.departments[selectedDept].faculty_coordinators ? (
                          scheduleData.departments[selectedDept].faculty_coordinators!.map((coord, index) => (
                            <div key={index} className="flex flex-col space-y-1">
                              <span className="text-white">{coord.name}</span>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <span className="flex items-center">
                                  <Phone className="w-4 h-4 mr-1" />
                                  {coord.phone}
                                </span>
                                {coord.email && (
                                  <span className="flex items-center">
                                    <Mail className="w-4 h-4 mr-1" />
                                    {coord.email}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col space-y-1">
                            <span className="text-white">
                              {scheduleData.departments[selectedDept].faculty_coordinator.name}
                            </span>
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Phone className="w-4 h-4 mr-1" />
                                {scheduleData.departments[selectedDept].faculty_coordinator.phone}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Student Coordinator */}
                    <div>
                      <h4 className="text-xl font-semibold mb-3 flex items-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        <School className="w-5 h-5 mr-2 text-purple-400" />
                        Student Coordinator
                      </h4>
                      <div className="flex flex-col space-y-1">
                        <span className="text-white">
                          {scheduleData.departments[selectedDept].student_coordinator.name}
                        </span>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span className="flex items-center">
                            <Phone className="w-4 h-4 mr-1" />
                            {scheduleData.departments[selectedDept].student_coordinator.phone}
                          </span>
                          {scheduleData.departments[selectedDept].student_coordinator.email && (
                            <span className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {scheduleData.departments[selectedDept].student_coordinator.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Events */}
                    <div>
                      <h4 className="text-xl font-semibold mb-3 flex items-center bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
                        <Calendar className="w-5 h-5 mr-2 text-purple-400" />
                        Events
                      </h4>
                      <div className="space-y-4">
                        {renderEvents(scheduleData.departments[selectedDept].events)}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Schedule;