"use client";

import React, { useMemo, useState } from "react";
import { Input, Select, Label, ListBox } from "@heroui/react";
import { FiSearch, FiSliders, FiChevronDown } from "react-icons/fi";
import LawyerGrid from "./LawyerGrid";

const normalize = (value) => String(value ?? "").toLowerCase().trim();

function getSelectionValue(selection) {
  if (selection == null) return null;
  if (Array.isArray(selection)) return selection[0] ?? null;
  return selection;
}

export default function LawyerFilterComponent({
  initialLawyers = [],
  error = null,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [specializationFilter, setSpecializationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("");

  const specializationOptions = useMemo(() => {
    const unique = new Map();

    (initialLawyers || []).forEach((lawyer) => {
      const spec = String(lawyer?.specialization ?? "").trim();
      if (!spec) return;
      unique.set(normalize(spec), spec);
    });

    return Array.from(unique.values());
  }, [initialLawyers]);

  const filteredLawyers = useMemo(() => {
    let result = [...(initialLawyers || [])];

    const search = normalize(searchQuery);

    if (search) {
      result = result.filter((lawyer) => {
        const name = normalize(lawyer?.name);
        const location = normalize(lawyer?.location);
        const specialization = normalize(lawyer?.specialization);

        return (
          name.includes(search) ||
          location.includes(search) ||
          specialization.includes(search)
        );
      });
    }

    if (specializationFilter !== "all") {
      const selectedSpec = normalize(specializationFilter);
      result = result.filter(
        (lawyer) => normalize(lawyer?.specialization) === selectedSpec
      );
    }

    if (sortBy === "fee-low") {
      result.sort((a, b) => (Number(a?.fee) || 0) - (Number(b?.fee) || 0));
    } else if (sortBy === "fee-high") {
      result.sort((a, b) => (Number(b?.fee) || 0) - (Number(a?.fee) || 0));
    } else if (sortBy === "popular") {
      result.sort(
        (a, b) => (Number(b?.totalHires) || 0) - (Number(a?.totalHires) || 0)
      );
    }

    return result;
  }, [initialLawyers, searchQuery, specializationFilter, sortBy]);

  const handleSpecializationChange = (value) => {
    const nextValue = getSelectionValue(value);
    setSpecializationFilter(nextValue || "all");
  };

  const handleSortChange = (value) => {
    const nextValue = getSelectionValue(value);
    setSortBy(nextValue || "");
  };

  return (
    <>
      <div className="bg-[#1e1e24] rounded-[24px] shadow-[0_4px_30px_rgba(0,0,0,0.2)] p-6 mb-8 border border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          <div className="md:col-span-5 flex flex-col gap-2">
            <Label
              htmlFor="lawyer-search"
              className="text-[11px] font-bold text-blue-400 uppercase tracking-wider pl-1"
            >
              Find Your Lawyer
            </Label>

            <div className="relative flex items-center w-full">
              <FiSearch className="absolute left-4 text-neutral-400 z-10 text-base" />
              <Input
                id="lawyer-search"
                placeholder="Search by name, expertise, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#121214] border border-neutral-700/80 rounded-xl text-sm text-neutral-200 placeholder-neutral-500 focus:bg-[#0d0d0f] focus:border-blue-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2">
            <Label className="text-[11px] font-bold text-blue-400 uppercase tracking-wider pl-1">
              Specialization
            </Label>

            <Select
              value={specializationFilter}
              onChange={handleSpecializationChange}
              placeholder="All Specializations"
              className="w-full"
            >
              <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-[#121214] border border-neutral-700/80 rounded-xl text-sm text-neutral-400 hover:bg-[#18181c] transition-all cursor-pointer outline-none hover:border-neutral-600">
                <Select.Value />
                <Select.Indicator>
                  <div className="flex items-center gap-2">
                    <FiSliders className="text-neutral-400 text-sm" />
                    <FiChevronDown className="text-neutral-400 text-sm" />
                  </div>
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover className="bg-[#1e1e24] border border-neutral-700 shadow-2xl rounded-xl p-1 z-50">
                <ListBox className="max-h-96 overflow-y-auto">
                  <ListBox.Item
                    key="all"
                    id="all"
                    textValue="All Specializations"
                    className="px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                  >
                    All Specializations
                  </ListBox.Item>

                  {specializationOptions.map((spec) => (
                    <ListBox.Item
                      key={spec}
                      id={spec}
                      textValue={spec}
                      className="px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                    >
                      {spec}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>

          <div className="md:col-span-3 flex flex-col gap-2">
            <Label className="text-[11px] font-bold text-blue-400 uppercase tracking-wider pl-1">
              Sort Options
            </Label>

            <Select
              value={sortBy}
              onChange={handleSortChange}
              placeholder="Sort By"
              className="w-full"
            >
              <Select.Trigger className="w-full flex items-center justify-between px-4 py-3 bg-[#121214] border border-neutral-700/80 rounded-xl text-sm text-neutral-400 hover:bg-[#18181c] transition-all cursor-pointer outline-none hover:border-neutral-600">
                <Select.Value />
                <Select.Indicator>
                  <FiChevronDown className="text-neutral-400 text-base ml-2" />
                </Select.Indicator>
              </Select.Trigger>

              <Select.Popover className="bg-[#1e1e24] border border-neutral-700 shadow-2xl rounded-xl p-1 z-50">
                <ListBox className="max-h-96 overflow-y-auto">
                  <ListBox.Item
                    key="popular"
                    id="popular"
                    textValue="Most Popular"
                    className="px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                  >
                    Most Popular
                  </ListBox.Item>
                  <ListBox.Item
                    key="fee-low"
                    id="fee-low"
                    textValue="Fee: Low to High"
                    className="px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                  >
                    Fee: Low to High
                  </ListBox.Item>
                  <ListBox.Item
                    key="fee-high"
                    id="fee-high"
                    textValue="Fee: High to Low"
                    className="px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800 rounded-lg cursor-pointer transition-colors"
                  >
                    Fee: High to Low
                  </ListBox.Item>
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>
      </div>

      <LawyerGrid lawyers={filteredLawyers} isLoading={false} error={error} />
    </>
  );
}