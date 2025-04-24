import { useState } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>(() => {
    // Load saved candidates from localStorage
    const saved = localStorage.getItem('savedCandidates');
    return saved ? JSON.parse(saved) : [];
  });

  const removeCandidate = (id: number) => {
    // Filter out the candidate to be removed
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.id !== id);
    setSavedCandidates(updatedCandidates);

    // Update localStorage
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  if (savedCandidates.length === 0) {
    return <h1>No saved candidates.</h1>;
  }

  return (
    <div>
      <h1>Potential Candidates</h1>
      <div className="saved-candidates-container">
        {savedCandidates.map((candidate) => (
          <div key={candidate.id} className="saved-candidate-box">
            <img src={candidate.avatar_url} alt={candidate.login} />
            <div className="saved-candidate-details">
              <p>Name: {candidate.name || 'N/A'}</p>
              <p>Username: {candidate.login}</p>
              <p>Location: {candidate.location || 'N/A'}</p>
              <p>Email: {candidate.email || 'N/A'}</p>
              <p>Company: {candidate.company || 'N/A'}</p>
              <p>Bio: {candidate.bio || 'N/A'}</p>
              <p>
                Profile: <a href={candidate.html_url}>{candidate.html_url}</a>
              </p>
            </div>
            <button onClick={() => removeCandidate(candidate.id)} className="remove-button">
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedCandidates;