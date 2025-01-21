import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpcomingContestsPopup = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const [contests, setContests] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [ongoingContest, setOngoingContest] = useState(null);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const fetchContests = async () => {
    try {
        const response = await axios.get('https://codeforces.com/api/contest.list');
        const data = response.data; 

      if (data.status === 'OK') {
        const allContests = data.result;

        const todayContests = allContests.filter((contest) => {
          const contestDate = new Date(contest.startTimeSeconds * 1000);
          return isToday(contestDate);
        });

        if (todayContests.length > 0) {
          setOngoingContest(todayContests[0]);
        }

        let upcomingContests = allContests.filter((contest) => contest.phase === 'BEFORE');

        upcomingContests.sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);

        setContests(upcomingContests);
      } else {
        setError('Failed to fetch contests. Please try again later.');
      }
    } catch (err) {
      setError('An error occurred while fetching contests.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchContests();
  }, []);

 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">

      <button
        onClick={togglePopup}
        className={`${
          ongoingContest
            ? 'bg-green-600 hover:bg-green-700 animate-pulse' 
            : 'bg-cyan-600 hover:bg-cyan-700' 
        } text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all`}
      >
        {ongoingContest ? `🏆Today ${ongoingContest.name}` : '🏆 Upcoming Contests'}
      </button>


      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-gray-800 border border-cyan-600 rounded-lg shadow-lg p-4">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">
            {ongoingContest ? 'Ongoing Contest' : 'Upcoming Contests'}
          </h3>

          {loading && <p className="text-gray-300">Loading...</p>}

          {error && <p className="text-red-500">{error}</p>}

          {ongoingContest && (
            <div className="mb-4 p-3 bg-green-900 rounded-lg">
              <p className="text-white font-semibold">{ ongoingContest.name}</p>
              <p className="text-gray-400 text-sm">
                Started at: {new Date(ongoingContest.startTimeSeconds * 1000).toLocaleString()}
              </p>
            </div>
          )}


          {!loading && !error && (
            <div className="max-h-64 overflow-y-auto">
              {contests.length === 0 ? (
                <p className="text-gray-300">No upcoming contests found.</p>
              ) : (
                contests.map((contest) => (
                  <div key={contest.id} className="mb-3">
                    <p className="text-white font-semibold">{contest.name}</p>
                    <p className="text-gray-400 text-sm">
                      Starts at: {new Date(contest.startTimeSeconds * 1000).toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UpcomingContestsPopup;