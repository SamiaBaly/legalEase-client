'use client';

import React from 'react';
import Link from 'next/link';
import { Card, Button } from '@heroui/react';
import {
  FaBookmark,
  FaCertificate,
  FaArrowRight,
  FaChartLine,
} from 'react-icons/fa';

const TopExperts = () => {
  // Static Specialized High-Value Lawyer Profiles Matrix
  const expertsList = [
    {
      _id: 'lawyer-003',
      name: 'Emily Carter',
      image: 'https://i.pravatar.cc/300?img=3',
      specialization: 'Criminal Defense',
      experience: '14+ Yrs Exp',
      totalHires: 112,
      badgeText: 'Top Litigator',
    },
    {
      _id: 'lawyer-001',
      name: 'Sarah Ahmed',
      image: 'https://i.pravatar.cc/300?img=1',
      specialization: 'Corporate Law',
      experience: '11+ Yrs Exp',
      totalHires: 89,
      badgeText: 'M&A Strategist',
    },
    {
      _id: 'lawyer-005',
      name: 'Sophia Martinez',
      image: 'https://i.pravatar.cc/300?img=5',
      specialization: 'Intellectual Property',
      experience: '9+ Yrs Exp',
      totalHires: 76,
      badgeText: 'Patent Expert',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto bg-background">
      {/* SECTION BANNER TYPOGRAPHY HEADER */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4 border-l-4 border-[#005A5B] pl-4">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#005A5B] mb-1">
            Verified Premium Partners
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-default-900 sm:text-4xl">
            Distinguished Advocates
          </h2>
        </div>
        <p className="text-sm text-default-500 max-w-sm">
          Retain elite legal counsel recognized for unparalleled domain
          performance, case volume efficiency, and active community trust
          metrics.
        </p>
      </div>

      {/* HORIZONTAL COMPACT ROWS WRAPPER STACK */}
      <div className="flex flex-col gap-4">
        {expertsList.map(lawyer => (
          <Card
            key={lawyer._id}
            className="border border-default-200 shadow-xs hover:shadow-sm hover:border-default-400 bg-content1 transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 gap-6 w-full">
              {/* COMPONENT COMPLIANT CUSTOM HEADER STRUCT (Left Side Grouping) */}
              <Card.Header className="flex flex-col sm:flex-row items-center gap-4 p-0 text-center sm:text-left shrink-0">
                <div className="relative w-16 h-16 shrink-0">
                  {/* CLEAN DOM IMPLEMENTATION: Uses native wrapper avoiding prop leakage */}
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#98FF98] bg-default-200 shadow-inner flex items-center justify-center">
                    {lawyer.image ? (
                      <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="w-full h-full object-cover object-top"
                        onError={e => {
                          // Clean JS initial fallback handling if path fails
                          e.target.style.display = 'none';
                          e.target.parentNode.innerHTML = `<span class="text-sm font-bold text-default-600">${lawyer.name.charAt(0)}</span>`;
                        }}
                      />
                    ) : (
                      <span className="text-sm font-bold text-default-600">
                        {lawyer.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="absolute -bottom-1 -right-1 bg-[#005A5B] text-white p-1 rounded-full border border-default-100 z-10">
                    <FaCertificate size={8} />
                  </span>
                </div>

                <div className="flex flex-col">
                  <Card.Title className="text-lg font-bold text-default-900 leading-tight">
                    {lawyer.name}
                  </Card.Title>
                  <Card.Description className="text-xs font-semibold text-default-500 mt-0.5 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="text-[#005A5B] dark:text-[#008B8B]">
                      {lawyer.specialization}
                    </span>
                    <span className="text-default-300">•</span>
                    <span>{lawyer.experience}</span>
                  </Card.Description>
                </div>
              </Card.Header>

              {/* COMPONENT COMPLIANT CONTENT BODY STRUCT (Center Statistics Column) */}
              <Card.Content className="py-0 flex flex-row items-center gap-6 text-center md:text-left bg-default-50 md:bg-transparent px-4 md:px-0 py-2.5 md:py-0 rounded-xl w-full md:w-auto justify-around md:justify-start">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-[#98FF98]/10 text-[#005A5B] rounded-lg border border-[#98FF98]/20">
                    <FaChartLine size={14} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-default-400 uppercase tracking-wide">
                      Case Volume
                    </p>
                    <p className="text-sm font-black text-default-800 dark:text-default-300">
                      {lawyer.totalHires} Retainers
                    </p>
                  </div>
                </div>

                <div className="hidden sm:block border-r border-default-200 h-8" />

                <div className="flex items-center gap-2">
                  <div className="p-2 bg-default-100 dark:bg-default-200 text-default-600 rounded-lg border border-default-200">
                    <FaBookmark size={12} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-default-400 uppercase tracking-wide">
                      Accreditation
                    </p>
                    <button className=" bg-[#005A5B]/5 text-[#005A5B] dark:text-[#20B2AA] hover:text-white font-bold text-xs pr-6 w-full md:w-auto transition-all duration-200">
                      {lawyer.badgeText}
                    </button>
                  </div>
                </div>
              </Card.Content>

              {/* COMPONENT COMPLIANT FOOTER ACTIONS STRUCT (Right Side Action Button) */}
              <Card.Footer className="p-0 flex justify-center w-full md:w-auto shrink-0">
                <Button
                  as={Link}
                  href={`/lawyers/${lawyer._id}`}
                  size="md"
                  radius="md"
                  variant="flat"
                  endContent={<FaArrowRight size={11} />}
                  className="bg-[#005A5B]/5 text-[#005A5B] dark:text-[#20B2AA] hover:bg-[#005A5B] hover:text-white font-bold text-xs px-6 w-full md:w-auto transition-all duration-200"
                >
                  Request Consultation
                </Button>
              </Card.Footer>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default TopExperts;
