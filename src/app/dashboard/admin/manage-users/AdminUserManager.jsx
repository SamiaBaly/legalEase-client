'use client';

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { updateUserRole } from "@/lib/acitons/users";
import Swal from "sweetalert2";

const AdminUserManager = ({ users }) => {
  const [allUsers] = useState(users?.users || []);


  const handleRoleChange = async (userId, role) => {
    const result = await Swal.fire({
      title: "Change User Role?",
      text: `Change this user's role to ${role}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await updateUserRole(userId, role);

    if (res?.success) {
      setAllUsers((prev) =>
        prev.map((user) =>
          user._id === userId
            ? { ...user, role }
            : user
        )
      );

      Swal.fire("Success!", "Role updated successfully.", "success");
    }
  };
  const roles = ["client", "lawyer", "admin"];

  return (
    <div className="min-h-screen bg-[#111111] p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="mt-2 text-zinc-400">
            Change user roles from the dashboard.
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#1b1b1b]">
          <table className="w-full">
            <thead className="border-b border-white/10 bg-[#232323]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Name
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Email
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Current Role
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Change Role
                </th>
              </tr>
            </thead>

            <tbody>
              {allUsers.length > 0 ? (
                allUsers.map((user, index) => (
                  <tr
                    key={user._id || user.id || index}
                    className="border-b border-white/10 transition hover:bg-white/5"
                  >
                    <td className="px-6 py-5 font-medium">
                      {user.name || "N/A"}
                    </td>

                    <td className="px-6 py-5 text-zinc-400">
                      {user.email}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-semibold capitalize text-cyan-400">
                        {user.role || "client"}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        {roles.map((role) => (
                          <Button
                            key={role}
                            size="sm"
                            variant={
                              user.role === role ? "solid" : "bordered"
                            }
                            color={
                              user.role === role ? "primary" : "default"
                            }
                            className="capitalize"
                            onPress={() =>
                              handleRoleChange(
                                user._id || user.id,
                                role
                              )
                            }
                          >
                            {role}
                          </Button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="py-10 text-center text-zinc-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManager;