import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<Candidate | null>(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      const response = await fetch('https://api.github.com/users?since=0');
      const data = await response.json();
      setCandidates(data);
    };
    fetchCandidates();
  }, []);

  const saveCandidate = (candidate: Candidate) => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    saved.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(saved));
    alert(`${candidate.login} has been added to saved candidates!`);

    // Reset search result and move to the next candidate
    setSearchResult(null);
    setCurrentIndex((prev) => (prev + 1 < candidates.length ? prev + 1 : 0));
  };

  const nextCandidate = () => {
    setSearchResult(null); // Clear search result if any
    setCurrentIndex((prev) => (prev + 1 < candidates.length ? prev + 1 : 0));
  };

  const searchGithubUser = async (username: string) => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
      setSearchResult(null);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      searchGithubUser(searchTerm);
    }
  };

  if (candidates.length === 0 && !searchResult) {
    return <h1>No candidates available. Please try again later.</h1>;
  }

  const candidate = searchResult || candidates[currentIndex];
  console.log('candidate; ', candidate);

  return (
    <div className="candidate-container">
      <h1>Candidate Search</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(); // Trigger search when Enter is pressed
            }
          }}
        />
      </div>
      <img src={candidate.avatar_url} alt={candidate.login} />
      <div className="candidate-details">
        <p>Name: {candidate.name || 'Not provided by user'}</p>
        <p>Username: {candidate.login}</p>
        <p>Location: {candidate.location || 'Not provided by user'}</p>
        <p>Email: {candidate.email || 'Not provided by user'}</p>
        <p>Company: {candidate.company || 'Not provided by user'}</p>
        <p>Bio: {candidate.bio || 'Not provided by user'}</p>
        <p>
          Profile: <a href={candidate.html_url}>{candidate.html_url}</a>
        </p>
      </div>
      <div className="button-group">
        <button onClick={() => saveCandidate(candidate)} className="green-button">Save</button>
        <button onClick={nextCandidate} className="red-button">Next</button>
      </div>
    </div>
  );
};

export default CandidateSearch;