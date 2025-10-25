"use client";

import { useDependencies } from "@/di/client/hooks/use-dependencies";

/**
 * League DI Hooks
 * Provides access to league use cases via dependency injection
 */

/**
 * Hook to get the CreateLeagueUseCase
 */
export function useCreateLeague() {
  const { createLeagueUseCase } = useDependencies();
  return createLeagueUseCase;
}

/**
 * Hook to get the GetAllLeaguesUseCase
 */
export function useGetAllLeagues() {
  const { getAllLeaguesUseCase } = useDependencies();
  return getAllLeaguesUseCase;
}

/**
 * Hook to get the GetPublicLeaguesUseCase
 */
export function useGetPublicLeagues() {
  const { getPublicLeaguesUseCase } = useDependencies();
  return getPublicLeaguesUseCase;
}

/**
 * Hook to get the GetMyLeaguesUseCase
 */
export function useGetMyLeagues() {
  const { getMyLeaguesUseCase } = useDependencies();
  return getMyLeaguesUseCase;
}

/**
 * Hook to get the GetLeagueByIdUseCase
 */
export function useGetLeagueById() {
  const { getLeagueByIdUseCase } = useDependencies();
  return getLeagueByIdUseCase;
}

/**
 * Hook to get the UpdateLeagueUseCase
 */
export function useUpdateLeague() {
  const { updateLeagueUseCase } = useDependencies();
  return updateLeagueUseCase;
}

/**
 * Hook to get the DeleteLeagueUseCase
 */
export function useDeleteLeague() {
  const { deleteLeagueUseCase } = useDependencies();
  return deleteLeagueUseCase;
}

/**
 * Hook to get the JoinLeagueUseCase
 */
export function useJoinLeague() {
  const { joinLeagueUseCase } = useDependencies();
  return joinLeagueUseCase;
}

/**
 * Hook to get the LeaveLeagueUseCase
 */
export function useLeaveLeague() {
  const { leaveLeagueUseCase } = useDependencies();
  return leaveLeagueUseCase;
}

/**
 * Hook to get the GetLeagueMembersUseCase
 */
export function useGetLeagueMembers() {
  const { getLeagueMembersUseCase } = useDependencies();
  return getLeagueMembersUseCase;
}

/**
 * Hook to get the RemoveMemberUseCase
 */
export function useRemoveMember() {
  const { removeMemberUseCase } = useDependencies();
  return removeMemberUseCase;
}

/**
 * Hook to get the TransferAdminUseCase
 */
export function useTransferAdmin() {
  const { transferAdminUseCase } = useDependencies();
  return transferAdminUseCase;
}
