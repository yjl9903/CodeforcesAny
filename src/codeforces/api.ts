import axios from 'axios';

import {
  HandleDTO,
  UserDTO,
  SubmissionDTO,
  ContestDTO,
  RatingChangeDTO
} from './type';

const api = axios.create({
  baseURL: 'https://codeforces.com/api/',
  timeout: 30 * 1000
});

export async function getUserInfo(handle: string): Promise<HandleDTO> {
  const {
    data: {
      result: [data]
    }
  } = await api.get('user.info', {
    params: {
      handles: handle
    }
  });
  return data as HandleDTO;
}

export async function getUserStatus(handle: string): Promise<SubmissionDTO[]> {
  const {
    data: { result }
  } = await api.get('user.status', {
    params: {
      handle: handle
    }
  });
  return result as SubmissionDTO[];
}

export async function getUserRating(
  handle: string
): Promise<RatingChangeDTO[]> {
  const {
    data: { result }
  } = await api.get('user.rating', {
    params: {
      handle: handle
    }
  });
  return result as RatingChangeDTO[];
}

export async function getUser(handle: string, name: string): Promise<UserDTO> {
  const [info, submissions, ratingChanges] = await Promise.all([
    getUserInfo(handle),
    getUserStatus(handle),
    getUserRating(handle)
  ]);
  return {
    ...info,
    name,
    submissions,
    ratingChanges
  };
}

export async function getContestList(): Promise<ContestDTO[]> {
  const Key = 'contest.list';
  const cache = window.sessionStorage.getItem(Key);
  if (cache) {
    return JSON.parse(cache);
  }
  const {
    data: { result }
  } = await api.get('contest.list');
  window.sessionStorage.setItem(Key, JSON.stringify(result));
  return result as ContestDTO[];
}

export async function getGymContestList(): Promise<ContestDTO[]> {
  const Key = 'contest.list.gym';
  const cache = window.sessionStorage.getItem(Key);
  if (cache) {
    return JSON.parse(cache);
  }
  const {
    data: { result }
  } = await api.get('contest.list', { params: { gym: true } });
  window.sessionStorage.setItem(Key, JSON.stringify(result));
  return result as ContestDTO[];
}

export async function getHandlesContestRank(
  handles: string[],
  contestId: number,
  showUnofficial?: true
) {
  const {
    data: { result }
  } = await api.get('contest.standings', {
    params: {
      contestId,
      showUnofficial,
      handles: handles.join(';')
    }
  });
  return result;
}
