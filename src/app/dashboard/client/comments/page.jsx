'use client';

import React from 'react';
import { Card, Button } from '@heroui/react';
import { toast } from 'react-hot-toast';
import { FaTrash, FaPen, FaCommentDots } from 'react-icons/fa';

export default function ClientCommentsPage() {
  // ডামি কমেন্ট ডেটাসেট
  const comments = [
    {
      id: 1,
      lawyerName: 'Adv. Barrister Asif',
      rating: 5,
      date: 'June 10, 2026',
      text: 'Highly experienced and strategic handling of my corporate asset case. Highly recommended!',
    },
    {
      id: 2,
      lawyerName: 'Dr. Sabrina Khan',
      rating: 4,
      date: 'May 28, 2026',
      text: 'Very supportive behaviour and informative session. The guidance on family law was explicit.',
    },
  ];

  const handleEdit = id => {
    toast(`Redirecting or opening modal to edit comment #${id}`, {
      icon: '📝',
    });
  };

  const handleDelete = id => {
    if (confirm('Are you sure you want to delete this comment?')) {
      toast.success(`Comment #${id} deleted successfully.`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <div>
        <h2 className="text-xl font-black text-default-900 dark:text-zinc-100 uppercase tracking-wide">
          Comment Management
        </h2>
        <p className="text-xs text-default-500">
          Review, update, or clear your feedbacks left on lawyers profiles.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {comments.map(comment => (
          <Card
            key={comment.id}
            className="p-5 bg-content1 dark:bg-zinc-900 border border-default-200 dark:border-zinc-800 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <FaCommentDots className="text-[#cda863]" size={16} />
                <h4 className="font-bold text-default-800 dark:text-zinc-200">
                  {comment.lawyerName}
                </h4>
                <span className="text-[10px] bg-default-100 dark:bg-zinc-800 text-default-500 px-2 py-0.5 rounded-md font-semibold">
                  {comment.date}
                </span>
              </div>
              <p className="text-sm text-default-600 dark:text-zinc-400 italic">
                "{comment.text}"
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <Button
                size="sm"
                isIconOnly
                onClick={() => handleEdit(comment.id)}
                className="bg-default-100 hover:bg-default-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-default-700 dark:text-zinc-200 rounded-xl"
              >
                <FaPen size={12} />
              </Button>
              <Button
                size="sm"
                isIconOnly
                onClick={() => handleDelete(comment.id)}
                className="bg-danger-50 hover:bg-danger-100 dark:bg-danger-950/30 text-danger rounded-xl border border-danger-200 dark:border-transparent"
              >
                <FaTrash size={12} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
