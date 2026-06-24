"use client";

import React, { useEffect, useState } from "react";
import { submitHire } from "@/lib/acitons/hire";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { submitComment } from "@/lib/acitons/comments";
import { getCommentsByHire } from "@/lib/api/comments";

export default function LawyerDetailsClient({
  lawyer,
  user,
  hires = [],
  existingHire,
}) {
  const router = useRouter();

  const isClient = user?.role === "client";
  const clientId = user?._id || user?.id;

  const currentHire =
    existingHire ||
    hires.find(
      (h) =>
        String(h.lawyerId) === String(lawyer?._id) &&
        String(h.clientId) === String(clientId)
    );

  const status = (currentHire?.status || "").toLowerCase();
  const isPending = status === "pending";
  const isAccepted = status === "accepted";
  const isPaid = status === "paid";

  const [comments, setComments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [comment, setComment] = useState("");
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  useEffect(() => {
    const loadComments = async () => {
      try {
        if (!currentHire?._id) return;
        const data = await getCommentsByHire(currentHire._id);
        setComments(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load comments:", error);
      }
    };

    loadComments();
  }, [currentHire?._id]);

  const handleHire = async () => {
    if (!isClient) {
      toast.error("Only clients can hire lawyers");
      return;
    }

    if (isPending || isAccepted || isPaid) {
      toast.error("You already have a request for this lawyer.");
      setIsModalOpen(false);
      return;
    }

    setIsLoading(true);

    try {
      const submissionData = {
        lawyerId: lawyer?._id,
        lawyerName: lawyer?.name,
        clientName: user?.name,
        clientEmail: user?.email,
        clientId,
        lawyerFee: lawyer?.fee,
        lawyerExperience: lawyer?.experience,
        lawyerLocation: lawyer?.location,
        lawyerBio: lawyer?.bio,
        status: "pending",
      };

      const res = await submitHire(submissionData);

      if (res?.alreadyExists) {
        toast.error("Hire request already exists");
        setIsModalOpen(false);
        router.refresh();
        return;
      }

      if (res?.acknowledged || res?.insertedId) {
        toast.success("Request sent successfully!");
        setIsModalOpen(false);
        router.refresh();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to send request");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (!comment.trim()) {
      toast.error("Write something first");
      return;
    }

    if (!currentHire?._id) {
      toast.error("Hire not found");
      return;
    }

    setIsCommentLoading(true);

    try {
      const commentData = {
        hireId: currentHire._id,
        lawyerId: lawyer?._id,
        lawyerName: lawyer?.name,
        clientId: user?._id || user?.id,
        clientName: user?.name,
        clientEmail: user?.email,
        text: comment.trim(),
      };

      const result = await submitComment(commentData);

      if (result?.acknowledged || result?.insertedId) {
        toast.success("Comment Sent");
        setComment("");

        const freshComments = await getCommentsByHire(currentHire._id);
        setComments(Array.isArray(freshComments) ? freshComments : []);
      } else {
        toast.error("Failed to save comment");
      }
    } catch (error) {
      toast.error(error?.message || "Failed to send comment");
    } finally {
      setIsCommentLoading(false);
    }
  };

  const buttonDisabled = isPending || isAccepted || isPaid;

  const buttonText = isPending
    ? "Request Pending"
    : isAccepted
    ? "Accepted"
    : isPaid
    ? "Already Hired"
    : "Hire Lawyer";

  const statusLabel = isPending
    ? "Pending"
    : isAccepted
    ? "Accepted"
    : isPaid
    ? "Paid"
    : "Available";

  return (
    <div className="min-h-screen bg-black p-4 md:p-8 space-y-6 text-white">
      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-800 rounded-2xl p-6 flex justify-between items-center">
        <div>
          <h3 className="text-gray-400 text-xs uppercase">My Activity</h3>
          <p className="text-xl font-bold mt-1">
            <span className="text-red-500 uppercase">{user?.name}</span>{" "}
            Total Lawyers Hired:{" "}
            <span className="text-indigo-400">{hires.length}</span>
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-full text-sm font-semibold border ${
            isPaid
              ? "bg-green-500/10 text-green-400 border-green-500/30"
              : isAccepted
              ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
              : isPending
              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
              : "bg-gray-800 text-gray-300 border-gray-700"
          }`}
        >
          {statusLabel}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-3xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={lawyer?.image}
            className="w-56 h-56 rounded-2xl object-cover border border-gray-700"
            alt={lawyer?.name}
          />

          <div className="flex-1 space-y-5">
            <h1 className="text-4xl font-bold">{lawyer?.name}</h1>
            <p className="text-gray-400">{lawyer?.bio}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-xs text-gray-400 uppercase">Specialization</p>
                <p className="text-indigo-300 font-semibold">
                  {lawyer?.specialization}
                </p>
              </div>

              <div className="bg-gray-800 p-4 rounded-xl">
                <p className="text-xs text-gray-400 uppercase">Fee</p>
                <p className="text-green-300 font-semibold">${lawyer?.fee}</p>
              </div>
            </div>

            {isClient ? (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                disabled={buttonDisabled}
                className={`w-full py-3 rounded-xl font-bold transition ${
                  buttonDisabled
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-500"
                }`}
              >
                {buttonText}
              </button>
            ) : (
              <p className="text-amber-400 text-sm">
                Only clients can hire lawyers
              </p>
            )}

            {(isAccepted || isPaid) && (
              <div
                className={`mt-6 p-4 rounded-xl border ${
                  isPaid
                    ? "bg-green-500/10 border-green-500/30"
                    : "bg-blue-500/10 border-blue-500/30"
                }`}
              >
                <h3
                  className={`font-bold mb-2 ${
                    isPaid ? "text-green-400" : "text-blue-400"
                  }`}
                >
                  {isPaid ? "Payment Successful" : "Hire Accepted"}
                </h3>
                <p className="text-gray-300 text-sm">
                  {isPaid
                    ? "You can now send message to this lawyer."
                    : "Your hire request has been accepted. Payment can be completed next."}
                </p>
              </div>
            )}

            {(isAccepted || isPaid) && (
              <div className="mt-6 bg-gray-800 p-4 rounded-xl border border-green-500/30 space-y-4">
                <h3 className="text-green-400 font-bold">Comment Section</h3>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write your message here..."
                  className="w-full min-h-28 bg-gray-900 border border-gray-700 rounded-xl p-3 text-white outline-none focus:border-green-400 resize-none"
                />

                <button
                  type="button"
                  onClick={handleSendComment}
                  disabled={isCommentLoading}
                  className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-xl font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isCommentLoading ? "Sending..." : "Send Comment"}
                </button>

                <div className="space-y-3">
                  {comments.length > 0 ? (
                    comments.map((item) => (
                      <div
                        key={item._id}
                        className="bg-gray-900 border border-gray-700 rounded-xl p-3"
                      >
                        <p className="font-semibold text-green-400">
                          {item.clientName}
                        </p>

                        <p className="text-gray-300 mt-1">{item.text}</p>

                        <p className="text-xs text-gray-500 mt-2">
                          {item.createdAt
                            ? new Date(item.createdAt).toLocaleString()
                            : ""}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No comments yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-gray-900 p-6 rounded-xl w-full max-w-sm border border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2">Confirm Hire?</h2>
            <p className="text-sm text-gray-400 mb-5">
              Are you sure you want to send a hire request to {lawyer?.name}?
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-700 py-2 rounded-lg font-medium"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleHire}
                disabled={isLoading}
                className="flex-1 bg-indigo-600 py-2 rounded-lg font-medium disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}