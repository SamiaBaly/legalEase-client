'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Button } from '@heroui/react';
import {
  FaBriefcase,
  FaDollarSign,
  FaUserPlus,
  FaCheckCircle,
  FaClock,
} from 'react-icons/fa';

const FeaturedLawyers = () => {
  const lawyers = [
    {
      _id: 'lawyer-001',
      userId: 'user-101',
      name: 'Sarah Ahmed',
      image: 'https://i.pravatar.cc/300?img=1',
      specialization: 'Corporate Law',
      bio: 'Experienced corporate lawyer specializing in mergers, acquisitions, and business compliance.',
      fee: 120,
      status: 'available',
      totalHires: 89,
      createdAt: '2026-01-10T10:00:00Z',
    },
    {
      _id: 'lawyer-002',
      userId: 'user-102',
      name: 'Michael Johnson',
      image: 'https://i.pravatar.cc/300?img=2',
      specialization: 'Family Law',
      bio: 'Helping families navigate divorce, child custody, and legal disputes with confidence.',
      fee: 90,
      status: 'busy',
      totalHires: 67,
      createdAt: '2026-01-15T12:30:00Z',
    },
    {
      _id: 'lawyer-003',
      userId: 'user-103',
      name: 'Emily Carter',
      image: 'https://i.pravatar.cc/300?img=3',
      specialization: 'Criminal Defense',
      bio: 'Dedicated criminal defense attorney with a strong track record in complex cases.',
      fee: 150,
      status: 'available',
      totalHires: 112,
      createdAt: '2026-02-01T09:15:00Z',
    },
    {
      _id: 'lawyer-004',
      userId: 'user-104',
      name: 'David Wilson',
      image: 'https://i.pravatar.cc/300?img=4',
      specialization: 'Immigration Law',
      bio: 'Assisting clients with visas, residency applications, and citizenship processes.',
      fee: 100,
      status: 'available',
      totalHires: 54,
      createdAt: '2026-02-08T14:20:00Z',
    },
    {
      _id: 'lawyer-005',
      userId: 'user-105',
      name: 'Sophia Martinez',
      image: 'https://i.pravatar.cc/300?img=5',
      specialization: 'Intellectual Property',
      bio: 'Protecting trademarks, copyrights, and patents for startups and enterprises.',
      fee: 135,
      status: 'busy',
      totalHires: 76,
      createdAt: '2026-02-15T11:45:00Z',
    },
    {
      _id: 'lawyer-006',
      userId: 'user-106',
      name: 'James Brown',
      image: 'https://i.pravatar.cc/300?img=6',
      specialization: 'Tax Law',
      bio: 'Expert in tax planning, audits, and compliance for individuals and businesses.',
      fee: 110,
      status: 'available',
      totalHires: 48,
      createdAt: '2026-03-01T08:30:00Z',
    },
    {
      _id: 'lawyer-007',
      userId: 'user-107',
      name: 'Olivia Taylor',
      image: 'https://i.pravatar.cc/300?img=7',
      specialization: 'Real Estate Law',
      bio: 'Handling property transactions, disputes, and real estate contracts.',
      fee: 95,
      status: 'available',
      totalHires: 39,
      createdAt: '2026-03-10T15:00:00Z',
    },
    {
      _id: 'lawyer-008',
      userId: 'user-108',
      name: 'Daniel Lee',
      image: 'https://i.pravatar.cc/300?img=8',
      specialization: 'Employment Law',
      bio: 'Representing employees and employers in workplace legal matters.',
      fee: 125,
      status: 'busy',
      totalHires: 61,
      createdAt: '2026-03-20T13:10:00Z',
    },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto bg-background">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-default-900">
          Meet Our <span className="text-[#005A5B]">Featured Lawyers</span>
        </h2>
        <div className="w-16 h-1 bg-[#98FF98] mx-auto mt-3 rounded-full" />
        <p className="mt-4 text-base text-default-500">
          Top-rated legal practitioners hand-selected based on exceptional
          consultation history, client evaluations, and successful case
          completions.
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {lawyers.map(lawyer => {
          const isAvailable = lawyer.status === 'available';

          return (
            <Card
              key={lawyer._id}
              className="border border-default-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {/* IMAGE WRAPPER AREA: Removed Avatar and replaced with w-full cover */}
              <div className="relative w-full h-48 bg-default-100 shrink-0">
                <Image
                  src={lawyer.image}
                  alt={lawyer.name}
                  fill
                  sizes="(max-w-7xl) 25vw"
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />

                {/* Status Indicator Badge floating over image */}
                <div className="absolute top-3 right-3 z-10">
                  <span
                    className={`flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                      isAvailable
                        ? 'bg-success/90 text-white'
                        : 'bg-warning/90 text-white'
                    }`}
                  >
                    {isAvailable ? (
                      <FaCheckCircle size={10} />
                    ) : (
                      <FaClock size={10} />
                    )}
                    {lawyer.status.charAt(0).toUpperCase() +
                      lawyer.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* CARD HEADER SECTION */}
              <Card.Header className="flex flex-col items-start pb-1 text-left px-4 pt-4">
                <Card.Title className="text-lg font-bold text-default-900 leading-tight">
                  {lawyer.name}
                </Card.Title>

                <Card.Description className="text-xs font-semibold text-[#005A5B] bg-[#005A5B]/5 px-2 py-0.5 rounded-md mt-1.5 flex items-center gap-1">
                  <FaBriefcase size={11} />
                  {lawyer.specialization}
                </Card.Description>
              </Card.Header>

              {/* CARD CONTENT / BODY SECTION */}
              <Card.Content className="py-2 text-left px-4 flex-grow">
                <p className="text-xs text-default-500 line-clamp-2 min-h-[36px] leading-relaxed">
                  {lawyer.bio}
                </p>

                {/* Micro Metric Statistics Grid */}
                <div className="grid grid-cols-2 gap-2 border-t border-b border-default-100 py-2.5 mt-3">
                  <div className="text-left border-r border-default-100">
                    <p className="text-[9px] uppercase font-bold tracking-wider text-default-400">
                      Hourly Rate
                    </p>
                    <p className="text-sm font-extrabold text-default-800 flex items-center mt-0.5">
                      <FaDollarSign size={11} className="text-default-500" />
                      {lawyer.fee}
                      <span className="text-[10px] font-normal text-default-500 ml-0.5">
                        /hr
                      </span>
                    </p>
                  </div>
                  <div className="text-left pl-2">
                    <p className="text-[9px] uppercase font-bold tracking-wider text-default-400">
                      Total Hires
                    </p>
                    <p className="text-sm font-extrabold text-default-800 flex items-center gap-1 mt-0.5">
                      <FaUserPlus size={12} className="text-default-500" />
                      {lawyer.totalHires}
                    </p>
                  </div>
                </div>
              </Card.Content>

              {/* CARD FOOTER SECTION */}
              <Card.Footer className="pt-2 pb-4 px-4 flex justify-center mt-auto">
                <Button
                  as={Link}
                  href={`/lawyers/${lawyer._id}`}
                  fullWidth
                  radius="md"
                  size="sm"
                  className={`font-semibold transition-colors ${
                    isAvailable
                      ? 'bg-[#005A5B] text-white hover:bg-[#004445]'
                      : 'bg-default-100 text-default-600 hover:bg-default-200'
                  }`}
                >
                  {isAvailable ? 'Book Appointment' : 'View Profile'}
                </Button>
              </Card.Footer>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default FeaturedLawyers;
