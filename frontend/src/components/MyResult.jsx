import React, { useCallback, useState } from 'react'
import { resultStyles } from '../assets/dummyStyles'

// show badge according to the percentage
const Badge = ({ percent }) => {
  if (percent >= 85)
    return <span className={resultStyles.badgeExcellent}>Excellent</span>;
  if (percent >= 65)
    return <span className={resultStyles.badgeGood}>Good</span>;
  if (percent >= 45)
    return <span className={resultStyles.badgeAverage}>Average</span>;
  return <span className={resultStyles.badgeNeedsWork}>Needs Work</span>;
};
const MyResult = ({apiBase = "http://localhos:4000"}) => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTechnology, setSelectTechnology] = useState("all");
    const [technology, setTechnologies] = useState([]);

    // token for user verification
    const getAuthHeader = useCallback(() => {
        const token = 
        localStorage.getItem("token") ||
        localStorage.getItem("authToken") ||
        null;
        return token ? {Authorization : `Bearer ${token}`} : {};

    }, []);

     useEffect(() => {
    let mounted = true;
    const fetchResults = async (tech = "all") => {
      setLoading(true);
      setError(null);
      try {
        const q =
          tech && tech.toLowerCase() !== "all"
            ? `?technology=${encodeURIComponent(tech)}`
            : "";
        const res = await axios.get(`${apiBase}/api/results${q}`, {
          headers: { "Content-Type": "application/json", ...getAuthHeader() },
          timeout: 10000,
        });
        if (!mounted) return;
        if (res.status === 200 && res.data && res.data.success) {
          setResults(Array.isArray(res.data.results) ? res.data.results : []);
        } else {
          setResults([]);
          toast.warn("Unexpected server response while fetching results.");
        }
      } catch (err) {
        console.error(
          "Failed to fetch results:",
          err?.response?.data || err.message || err
        );
        if (!mounted) return;
        if (err?.response?.status === 401) {
          setError("Not authenticated. Please log in to view results.");
          toast.error("Not authenticated. Please login.");
        } else {
          setError("Could not load results from server.");
          toast.error("Could not load results from server.");
          setResults([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchResults(selectedTechnology);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiBase, selectedTechnology, getAuthHeader]);
  return (
    <div>
      
    </div>
  )
}
