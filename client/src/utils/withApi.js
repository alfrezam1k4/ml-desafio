import React, { useCallback, useMemo } from 'react';
import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export const useApi = () => {
  const apiFactory = useCallback(() => {
    return {
      getItems: (search, apiConfig = {}) => {
        return api.get(`/api/items?q=${search.trim()}`, apiConfig);
      },
      getItemDetails: (id, apiConfig = {}) => {
        return api.get(`/api/items/${id}`, apiConfig);
      },
    };
  }, []);

  const ctx = useMemo(
    () => ({
      withAuth: apiFactory(true),
      ...apiFactory(false),
    }),
    [apiFactory]
  );

  return ctx;
};

export default function withApi(WrappedComponent) {
  return (props) => {
    const _api = useApi();
    return <WrappedComponent api={_api} {...props} />;
  };
}
