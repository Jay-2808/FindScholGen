document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const filterSelect = document.getElementById('filterSelect');
    const resultsContainer = document.getElementById('scholarshipResults');

    // Sample scholarship data (would typically come from backend)
    const scholarships = [
        {
            id: 1,
            name: 'STEM Excellence Scholarship',
            amount: 5000,
            category: 'STEM',
            description: 'For outstanding students in Science, Technology, Engineering, and Mathematics',
            deadline: '2024-12-31'
        },
        {
            id: 2,
            name: 'Arts Innovation Grant',
            amount: 3500,
            category: 'Arts',
            description: 'Supporting creative students in visual and performing arts',
            deadline: '2024-11-15'
        },
        {
            id: 3,
            name: 'Tech Innovators Scholarship',
            amount: 7500,
            category: 'Technology',
            description: 'For students driving technological innovation',
            deadline: '2024-10-20'
        }
    ];

    function displayScholarships(filteredScholarships) {
        resultsContainer.innerHTML = '';
        filteredScholarships.forEach(scholarship => {
            const scholarshipCard = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${scholarship.name}</h5>
                            <p class="card-text">${scholarship.description}</p>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Amount: $${scholarship.amount}</li>
                                <li class="list-group-item">Category: ${scholarship.category}</li>
                                <li class="list-group-item">Deadline: ${scholarship.deadline}</li>
                            </ul>
                            <a href="#" class="btn btn-primary mt-3">Apply Now</a>
                        </div>
                    </div>
                </div>
            `;
            resultsContainer.innerHTML += scholarshipCard;
        });
    }

    function filterScholarships() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryFilter = filterSelect.value;

        const filteredScholarships = scholarships.filter(scholarship => {
            const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm) || 
                                  scholarship.description.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === '' || scholarship.category === categoryFilter;
            
            return matchesSearch && matchesCategory;
        });

        displayScholarships(filteredScholarships);
    }

    searchInput.addEventListener('input', filterScholarships);
    filterSelect.addEventListener('change', filterScholarships);

    // Initial display
    displayScholarships(scholarships);
});