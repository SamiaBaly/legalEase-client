'use client'; // Fixes the Next.js Server Component function serialization error

import React from 'react';
import Link from 'next/link';
import { Card, Button } from '@heroui/react';
import { FaCrown, FaArrowRight, FaHashtag } from 'react-icons/fa';

const LegalCategories = () => {
  // Static Lawyer List Data Matrix
  const lawyers = [
    {
      _id: 'lawyer-001',
      name: 'Sarah Ahmed',
      image: 'https://i.pravatar.cc/300?img=1',
      specialization: 'Corporate Law',
      totalHires: 89,
    },
    {
      _id: 'lawyer-002',
      name: 'Michael Johnson',
      image: 'https://i.pravatar.cc/300?img=2',
      specialization: 'Family Law',
      totalHires: 67,
    },
    {
      _id: 'lawyer-003',
      name: 'Emily Carter',
      image: 'https://i.pravatar.cc/300?img=3',
      specialization: 'Criminal Defense',
      totalHires: 112,
    },
    {
      _id: 'lawyer-004',
      name: 'David Wilson',
      image: 'https://i.pravatar.cc/300?img=4',
      specialization: 'Immigration Law',
      totalHires: 54,
    },
  ];

  // Logic: Filters & picks top 3 lawyers with most hires
  const topThreeExperts = [...lawyers]
    .sort((a, b) => b.totalHires - a.totalHires)
    .slice(0, 3);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto bg-background">
      {/* SECTION BANNER HEADLINE */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 bg-[#005A5B]/5 border border-[#005A5B]/10 px-3 py-1 rounded-full text-[#005A5B] text-xs font-bold tracking-wider uppercase mb-3">
          <FaCrown className="text-warning" size={12} />
          <span>Elite Counsel Matrix</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-default-900">
          Top Legal <span className="text-[#005A5B]">Experts</span>
        </h2>

        <p className="mt-3 text-sm text-default-500">
          Discover our highest-ranked legal practitioners based globally on
          total individual client hiring configurations.
        </p>
      </div>

      {/* THREE CARDS FLEX GRID GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topThreeExperts.map((lawyer, index) => (
          <Card
            key={lawyer._id}
            className="p-5 border border-default-200 shadow-sm hover:shadow-md transition-all duration-300 bg-content1"
          >
            {/* COMPONENT COMPLIANT CUSTOM HEADER STRUCT */}
            <Card.Header className="flex flex-col items-center pb-2 text-center relative w-full">
              {/* Leaderboard Badge Rank Tag */}
              <div className="absolute top-0 right-0 flex items-center gap-0.5 text-[11px] font-bold text-default-500 bg-default-100 px-2 py-0.5 rounded-md border border-default-200/50">
                <FaHashtag size={8} />
                <span>{index + 1}</span>
              </div>

              {/* FIXED AVATAR IMPLEMENTATION: Safe from DOM element prop leaks */}
              <div
                className={`w-20 h-20 rounded-full overflow-hidden mb-3 border-2 flex items-center justify-center bg-default-200 shrink-0 shadow-inner ${
                  index === 0 ? 'border-warning' : 'border-default-200'
                }`}
              >
                {lawyer.image ? (
                  <img
                    src={lawyer.image}
                    alt={lawyer.name}
                    className="w-full h-full object-cover object-top"
                    onError={e => {
                      // Initial fallback handler if image URL fails
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<span class="text-lg font-bold text-default-600">${lawyer.name.charAt(0)}</span>`;
                    }}
                  />
                ) : (
                  <span className="text-lg font-bold text-default-600">
                    {lawyer.name.charAt(0)}
                  </span>
                )}
              </div>

              <Card.Title className="text-xl font-bold text-default-900 leading-tight">
                {lawyer.name}
              </Card.Title>

              <Card.Description className="text-xs font-semibold text-[#005A5B] tracking-wide mt-1">
                {lawyer.specialization}
              </Card.Description>
            </Card.Header>

            {/* COMPONENT COMPLIANT CONTENT BODY STRUCT */}
            <Card.Content className="py-4 text-center">
              <div className="bg-default-50 border border-default-100 rounded-xl py-3 px-4 flex flex-col justify-center items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-default-400">
                  Platform Rating
                </span>
                <span className="text-lg font-black text-default-800 mt-0.5">
                  {lawyer.totalHires}{' '}
                  <span className="text-xs font-medium text-default-500">
                    Total Hires
                  </span>
                </span>
              </div>
            </Card.Content>

            {/* COMPONENT COMPLIANT FOOTER ACTIONS STRUCT */}
            <Card.Footer className="pt-2 flex justify-center w-full">
              <Button
                as={Link}
                href={`/lawyers/${lawyer._id}`}
                fullWidth
                radius="lg"
                size="md"
                endContent={<FaArrowRight size={12} />}
                className="bg-[#005A5B] hover:bg-[#004445] text-white font-semibold transition-colors duration-200 shadow-sm"
              >
                View Profile
              </Button>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LegalCategories;
