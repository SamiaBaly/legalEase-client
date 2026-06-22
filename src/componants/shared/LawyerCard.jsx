"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, Avatar, Button, Chip } from "@heroui/react";
import { FiBriefcase, FiMapPin, FiDollarSign, FiUserCheck } from "react-icons/fi";
import Link from "next/link";

export default function LawyerCard({ lawyer }) {
  const router = useRouter();
  
  const {
    _id,
    name,
    specialization,
    fee,
    location,
    availability,
    image,
    companyName,
    totalHires
  } = lawyer;

  const lawyerId = _id?.$oid || _id;
  const isBusy = availability?.toLowerCase() === "busy";

  const handleCardClick = () => {
    router.push(`/lawyers/${lawyerId}`);
  };

  const handleAction = (e, actionType) => {
    e.stopPropagation(); 
    if (actionType === "hire") {
      console.log(`Hire initiated for ${name}.`);
    }
  };

  const getBadgeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "corporate": return "primary";
      case "criminal": return "danger";
      case "family": return "secondary";
      default: return "default";
    }
  };

  return (
    <Card 
      onClick={handleCardClick}
      // * এখানে bg-content1, বর্ডার এবং শ্যাডো পরিবর্তন করে আলাদা করা হয়েছে }
      className="w-full cursor-pointer hover:scale-[1.02] transition-transform duration-200 bg-content1 border border-default-200/60 shadow-md hover:shadow-lg"
    >
      <Card.Header className="justify-between items-start gap-2 p-4">
        <div className="flex gap-3 items-center">
          
          <div className="relative flex-shrink-0">
            <Avatar className="w-12 h-12 border-2 border-default-200">
              <Avatar.Image 
                src={image || "https://images.unsplash.com/photo-1560250097-0b93528c311a"} 
                alt={name} 
              />
              <Avatar.Fallback name={name?.[0] || "L"} />
            </Avatar>
            
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isBusy ? 'bg-danger' : 'bg-success'}`}></span>
              <span className={`relative inline-flex rounded-full h-3 w-3 ${isBusy ? 'bg-danger' : 'bg-success'}`}></span>
            </span>
          </div>

          <div className="flex flex-col items-start justify-center gap-0.5">
            <h4 className="text-small font-semibold leading-none text-default-800">{name}</h4>
            <span className="text-tiny text-default-400 truncate max-w-[150px]">{companyName}</span>
            
            <span className={`text-[11px] font-medium mt-0.5 capitalize ${isBusy ? 'text-danger' : 'text-success'}`}>
              {availability || "Available"}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className="text-tiny font-bold text-success flex items-center gap-0.5 bg-success-50 dark:bg-success-950/30 px-2 py-0.5 rounded-full">
            <FiDollarSign size={12} />
            {fee}/hr
          </span>

          {specialization && (
            <Chip 
              size="sm" 
              variant="flat" 
              color={getBadgeColor(specialization)}
              className="text-[10px] h-5 capitalize font-semibold px-2"
            >
              {specialization}
            </Chip>
          )}
        </div>
      </Card.Header>

      <Card.Content className="px-4 py-0 text-small text-default-600 gap-2 flex flex-col my-2">
        <div className="flex items-center gap-2">
          <FiBriefcase className="text-default-400 flex-shrink-0" size={14} />
          <span className="font-medium text-default-700">{specialization} Expert</span>
        </div>
        
        <div className="flex items-center gap-2">
          <FiMapPin className="text-default-400 flex-shrink-0" size={14} />
          <span className="truncate text-default-500">{location}</span>
        </div>

        <div className="flex items-center gap-2 text-tiny text-default-400 mt-1">
          <FiUserCheck size={12} className="text-primary-400" />
          <span>{totalHires} {totalHires === 1 ? 'client hired' : 'clients hired'}</span>
        </div>
      </Card.Content>

      <Card.Footer className="p-4 pt-2 gap-2">
        <Link
          href={ `/jobs/${lawyerId}`}
          className="flex-1 text-tiny font-medium"
          color={isBusy ? "default" : "primary"}
          radius="full"
          size="sm"
          variant={isBusy ? "flat" : "solid"}
          disabled={isBusy}
          onClick={(e) => handleAction(e, "hire")}
        >
          {isBusy ? "Fully Booked" : "Hire Lawyer"}
        </Link>
      </Card.Footer>
    </Card>
  );
}