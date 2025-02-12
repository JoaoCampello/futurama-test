import React, { useState, useEffect } from 'react';
import './styles.css';

const CharactersPage = () => {
    const [data, setData] = useState({
        characters: [],
        loading: true
    });
    const [filters, setFilters] = useState({
        gender: '',
        status: '',
        species: ''
    });

    const filterOptions = {
        gender: ['MALE', 'FEMALE', 'UNKNOWN'],
        status: ['ALIVE', 'DEAD', 'UNKNOWN'],
        species: ['HUMAN', 'ROBOT', 'HEAD', 'ALIEN', 'MUTANT', 'MONSTER']
    };

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                let url = 'https://futuramaapi.com/api/characters';
                const queryParams = new URLSearchParams();
                
                // Add active filters to query params
                Object.entries(filters).forEach(([key, value]) => {
                    if (value) queryParams.append(key, value.toLowerCase());
                });

                // Append query params to URL if any filters are active
                const queryString = queryParams.toString();
                if (queryString) {
                    url += `?${queryString}`;
                }

                const response = await fetch(url);
                const jsonData = await response.json();
                
                setData({
                    characters: jsonData.items,
                    loading: false
                });
            } catch (error) {
                console.error('Error fetching characters:', error);
                setData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchCharacters();
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setData(prev => ({ ...prev, loading: true }));
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const FilterSection = () => (
        <div className="filter-section">
            {Object.entries(filterOptions).map(([filterType, options]) => (
                <div key={filterType} className="filter-group">
                    <select 
                        value={filters[filterType]}
                        onChange={(e) => handleFilterChange(filterType, e.target.value)}
                        className="filter-select"
                    >
                        <option value="">All {filterType}s</option>
                        {options.map(option => (
                            <option key={option} value={option}>
                                {option.charAt(0) + option.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );

    if (data.loading) {
        return (
            <div className="characters-page">
                <video className="video-background" autoPlay loop muted playsInline>
                    <source src="/assets/videos/background-vid.mp4" type="video/mp4" />
                </video>
                <div className="loading">Loading characters...</div>
            </div>
        );
    }

    return (
        <div className="characters-page">
            <video className="video-background" autoPlay loop muted playsInline>
                <source src="/assets/videos/background-vid.mp4" type="video/mp4" />
            </video>

            <FilterSection />

            <div className="characters-grid">
                {data.characters.map((character) => (
                    <div key={character.id} className="character-card">
                        <img 
                            src={character.image ? character.image : '/assets/images/placeholder-character.jpg'}
                            alt={character.name}
                            onError={(e) => {
                                e.target.src = '/assets/images/placeholder-character.jpg';
                            }}
                        />
                        <div className="character-info">
                            <h3>{character.name}</h3>
                            <p className="species">{character.species}</p>
                            <div className="character-details">
                                <span className="status">{character.status}</span>
                                <span className="gender">{character.gender}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharactersPage;