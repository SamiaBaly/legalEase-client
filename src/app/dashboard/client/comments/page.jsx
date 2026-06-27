'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { getComments } from '@/lib/api/comments';
import { deleteComment } from '@/lib/acitons/comments';

import {
  FiMessageSquare,
  FiTrash2,
  FiRefreshCw,
  FiSearch,
  FiAlertCircle,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AlertDialog, Button } from '@heroui/react';

export default function AllCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
const [selectedCommentId, setSelectedCommentId] = useState(null);

  const loadComments = async () => {
    try {
      setLoading(true);
      const data = await getComments();
      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleDelete = async () => {
  if (!selectedCommentId) return;

  setDeletingId(selectedCommentId);

  try {
    const result = await deleteComment(selectedCommentId);

    if (result?.deletedCount > 0 || result?.success) {
      setComments(prev =>
        prev.filter(c => String(c._id) !== String(selectedCommentId))
      );
      toast.success('Comment deleted');
    } else {
      toast.error('Could not delete comment');
    }
  } catch (error) {
    console.error(error);
    toast.error('Delete failed');
  } finally {
    setDeletingId(null);
    setSelectedCommentId(null);
    setIsDeleteOpen(false);
  }
};

  const filteredComments = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return comments;

    return comments.filter(comment => {
      const text = String(comment?.text || '').toLowerCase();
      const name = String(comment?.name || comment?.author || '').toLowerCase();
      const email = String(comment?.email || '').toLowerCase();
      return text.includes(q) || name.includes(q) || email.includes(q);
    });
  }, [comments, search]);

  const totalComments = comments.length;

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                <FiMessageSquare />
                Comment Management
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                All Comments
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-zinc-400">
                Review, search, and remove comments from a clean admin dashboard.
              </p>
            </div>

            <button
              onClick={loadComments}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Total</p>
              <p className="mt-2 text-2xl font-semibold text-white">{totalComments}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Visible</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {filteredComments.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Status</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-400">
                {loading ? 'Loading' : 'Ready'}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <FiSearch className="text-zinc-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search comments, names, or emails..."
            className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 outline-none"
          />
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl shadow-black/30 backdrop-blur-xl">
          {loading ? (
            <div className="flex min-h-[320px] items-center justify-center p-8">
              <div className="flex flex-col items-center gap-3 text-zinc-400">
                <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-cyan-400" />
                <p className="text-sm">Loading comments...</p>
              </div>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="flex min-h-[320px] flex-col items-center justify-center p-8 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
                <FiAlertCircle className="text-2xl" />
              </div>
              <h2 className="text-xl font-semibold text-white">No comments found</h2>
              <p className="mt-2 max-w-md text-sm text-zinc-400">
                Try another search term or refresh the list.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
                  {filteredComments.map(comment => {
                    console.log("ডাটাবেসের ডাটা:", comment);
                    // ডাটাবেস থেকে পাওয়া ফিল্ডের নামগুলো এখানে সঠিকভাবে ম্যাপ করা হয়েছে
                    const id = comment?._id;
                    const text = comment?.comment || 'No comment text available.'; // ডাটাবেসের ফিল্ডের নাম 'comment'
                    const name = comment?.clientName || 'Anonymous';              // ডাটাবেসের ফিল্ডের নাম 'clientName'
                    const email = comment?.email || 'No email';
                    const initial = String(name).trim().charAt(0).toUpperCase() || 'A';

                    return (
                      <div
                        key={String(id)}
                        className="flex flex-col gap-4 p-5 transition hover:bg-white/5 md:flex-row md:items-start md:justify-between"
                      >
                        <div className="flex gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-sm font-bold text-cyan-200">
                            {initial}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold text-white">{name}</h3>
                              <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] text-zinc-400">
                                {email}
                              </span>
                            </div>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-300">
                              {text}
                            </p>

                            <p className="mt-3 text-xs text-zinc-500">
                              ID: <span className="text-zinc-400">{String(id)}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2 md:self-center">
                          <button
                            disabled={deletingId === id}
                            onClick={() => {
                              setSelectedCommentId(comment._id);
                              setIsDeleteOpen(true);
                            }}
                            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${deletingId === id
                                ? 'cursor-not-allowed bg-red-500/30 text-red-200'
                                : 'bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300'
                              }`}
                          >
                            <FiTrash2 />
                            {deletingId === id ? 'Deleting...' : 'Delete'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
            </div>
          )}
        </div>
      </div>
      <AlertDialog
  isOpen={isDeleteOpen}
  onOpenChange={setIsDeleteOpen}
>
  <AlertDialog.Backdrop>
    <AlertDialog.Container>
      <AlertDialog.Dialog>
        <AlertDialog.Header>
          <AlertDialog.Heading>
            Delete Comment
          </AlertDialog.Heading>
        </AlertDialog.Header>

        <AlertDialog.Body>
          Are you sure you want to delete this comment?
        </AlertDialog.Body>

        <AlertDialog.Footer>
          <Button
            variant="light"
            onPress={() => setIsDeleteOpen(false)}
          >
            Cancel
          </Button>

          <Button
            color="danger"
            onPress={handleDelete}
          >
            Delete
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Dialog>
    </AlertDialog.Container>
  </AlertDialog.Backdrop>
</AlertDialog>
    </div>
  );
}