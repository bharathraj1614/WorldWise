import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

function useParmsLocation() {
  const [params] = useSearchParams();
  const lat = params.get("lat");
  const lng = params.get("lng");

  return useMemo(() => {
    return {
      lat: lat,
      lng: lng,
    };
  }, [lat, lng]);
}

export default useParmsLocation;
