"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  title: string;
  bio: string;
  image: string;
  specialties?: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Karen Laber",
    title: "Founder, PMHNP-BC",
    bio: "Karen is a Psychiatric Mental Health Nurse Practitioner. With over 25 years of experience as an EMT, ER, ICU and flight nurse, Karen's experiences in these roles came with a great personal cost, as any nurse or responder can relate to. She realized that there was a need for both culturally relevant and competent mental health care, where responders could get help from someone who understands the lifestyle and demands of responder life, and the impact it has. Her passion for treating first responders and their families led her to become a board certified psychiatric mental health nurse practitioner (PMHNP-BC), and together with her husband, they founded ReThink Mental Health and Wellness. She enjoys teaching, especially peer support trainings for several local police, fire, and EMS, agencies. She also lectures for paramedic and nursing students sharing lessons she has learned in her career and how to avoid and overcome secondary trauma. She leads a secondary trauma and resiliency course on occasion with a local non-profit. She is also certified in weight loss medicine and peptide therapy and believes mental health includes caring for the entire body. She takes an individualized, person-centered approach to care. She is married to a Police Officer and has two grown boys. She loves music, the outdoors, and is an avid big game hunter. Her pup Lilly also joins her at the office every day.",
    image: "/team/karen-laber.jpg",
    specialties: ["First Responder Mental Health", "Secondary Trauma", "Resiliency Training", "Weight Loss Medicine", "Peptide Therapy"]
  },
  {
    id: 2,
    name: "Erin Webb",
    title: "PMHNP-BC",
    bio: "Erin is a Psychiatric Mental Health Nurse Practitioner with over 15 years of nursing experience working with military members and their families, as well as Veterans. As a Navy Veteran herself, Erin has a passion for serving those who serve our country and community. She believes in a holistic approach to mental wellness, recognizing that resilience and healing aren't attained with a one-size-fits-all treatment plan, but rather one that has been tailored to each individual's unique desires, needs, and often age. Erin also enjoys supporting and caring for young children and older adults. Because of her current and past experience in the Navy, she understands the intricacies of caring for those, and the families of those, that serve, as well as first responders. Erin was born and raised in Arizona and lived all over the country during her nearly 12 years of active-duty service. Now in Colorado, she remains a member of the United States Navy Reserves. Erin is also married to a Navy Veteran, with whom she shares two children and two dogs. She enjoys spending time with her family, listening to true crime podcasts, gardening and crafting.",
    image: "/team/erin-webb.jpg",
    specialties: ["Military Mental Health", "Veterans Care", "Holistic Wellness", "Child & Adolescent Care", "Geriatric Mental Health"]
  },
  {
    id: 3,
    name: "Jackie Ewer",
    title: "RN, CCRN",
    bio: "Jackie is long-time Registered Nurse and ReThink's Ketamine and IV Wellness Program Manager. She has worked with clients of all ages throughout her career. Her nursing expertise includes Trauma nursing, ICU, interventional radiology, medical robotics, and she also has a deep passion for caring for those who have suffered spinal cord injuries, traumatic brain injuries (TBI). She also worked in mental health care where she has managed psychiatry practices, mobile IV and ketamine programs prior to joining our team at ReThink. Outside of her professional life, she enjoys spending time with her two sons, furry four-legged family members, traveling, live music, sports, and exploring new restaurants around town.",
    image: "/team/jackie-ewer.jpg",
    specialties: ["Ketamine Therapy", "IV Wellness", "Trauma Nursing", "TBI Care", "Mental Health Management"]
  },
  {
    id: 4,
    name: "Brooklyne Armbruster",
    title: "Administrative Assistant",
    bio: "Brooklyne is an integral part of our team here at ReThink. She keeps the office running smoothly and we would be lost without her! She welcomes everyone who walks through our door with her contagious smile and energy. Brooklyne proudly comes from a long line of Emergency Responders and Veterans who are her inspiration for working in healthcare. Her mom is a long-time ER/ICU nurse (and one of the funniest people in the world), and two very special grandfathers. One served our country in WWII as a paratrooper, and the other served in the Airforce in Vietnam, as well as being a Houston Police K9 Unit Officer. Brooklyne has an innate caregiver heart full of compassion, and coupled with her incredibly funny sense of humor, she keeps us all smiling! In her free time she enjoys paddleboarding, music, and animals. She is the parent of a cantankerous orange kitty named Tigger, AKA \"Mista\", who sadly, does NOT enjoy paddle boarding.",
    image: "/team/brooklyne-armbruster.jpg",
    specialties: ["Office Management", "Patient Coordination", "Administrative Support", "Customer Service"]
  },
  {
    id: 5,
    name: "Lilly",
    title: "Therapy Dog",
    bio: "Lilly is ReThink Mental Health and Wellness' resident therapy dog in training. She is certain that she is actually the Office Manager, door greeter, couch warmer, and generally in charge of all things. She is eagerly working on her service dog training and certification. During your appointment, you will likely meet her in our waiting room with one of her stuffed animals or patrolling the halls looking for someone to give hugs and kisses to! She will frequently present her beloved toys to you as a friendship gesture when you arrive. She joins Karen during client sessions and helps provide stress relief and comfort to clients. She especially loves to give hugs with her fluffy paws. She has the gift of \"lying puppy dog eyes\", which she uses to make others believe she is in need of food and lacking attention. We assure you, she is fed and spoiled, so don't believe her!",
    image: "/team/lilly.jpg",
    specialties: ["Therapy Support", "Stress Relief", "Emotional Comfort", "Office Morale"]
  }
];

const Team = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Filter team members into two groups
  const clinicalTeam = teamMembers.filter(member => 
    ["Karen Laber", "Erin Webb", "Jackie Ewer"].includes(member.name)
  );
  
  const supportTeam = teamMembers.filter(member => 
    ["Brooklyne Armbruster", "Lilly"].includes(member.name)
  );

  // Reusable team member card component
  const TeamMemberCard = ({ member }: { member: TeamMember }) => (
    <div
      key={member.id}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      onClick={() => setSelectedMember(member)}
    >
      <div className="relative w-full pt-[100%] bg-gray-200 overflow-hidden">
        <Image 
          src={member.image} 
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-teal-700">{member.name}</h3>
        <p className="text-orange-400 font-medium mb-2">{member.title}</p>
        <p className="text-gray-600 mb-4 line-clamp-3">{member.bio}</p>
        <button
          className="text-teal-700 font-medium hover:text-teal-800"
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMember(member);
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-700">Meet Our Team</h2>
        
        {/* Clinical Team Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-teal-700 mb-8 text-center">Clinical Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {clinicalTeam.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
        
        {/* Support Team Section */}
        <div>
          <h3 className="text-2xl font-semibold text-teal-700 mb-8 text-center">Office Administration & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {supportTeam.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>

      {/* Modal for detailed team member view */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-teal-700">{selectedMember.name}</h3>
                  <p className="text-orange-400 font-medium">{selectedMember.title}</p>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="md:flex">
                <div className="md:w-1/3 mb-4 md:mb-0">
                  <div className="relative w-full pt-[100%] bg-gray-200 rounded-lg overflow-hidden">
                    <Image 
                      src={selectedMember.image} 
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </div>
                <div className="md:w-2/3 md:pl-6">
                  <div className="prose max-w-none">
                    <h4 className="text-lg font-semibold text-teal-700 mb-2">About</h4>
                    <p className="mb-4">{selectedMember.bio}</p>

                    {selectedMember.specialties && (
                      <>
                        <h4 className="text-lg font-semibold text-teal-700 mb-2">Specialties</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 mb-4">
                          {selectedMember.specialties.map((specialty, index) => (
                            <li key={index} className="flex items-center">
                              <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {specialty}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="mt-6">
                      <a
                        href="/contact"
                        className="inline-block bg-teal-700 text-white px-6 py-2 rounded-md hover:bg-teal-800 transition-colors"
                      >
                        Schedule with {selectedMember.name.split(' ')[0]}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Team;
