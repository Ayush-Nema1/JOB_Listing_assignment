"""
Job Board - Backend
-------------------
Ek chota FastAPI server jo realistic software job listings ko
page-by-page return karta hai.

Koi database nahi - assessment ke liye startup par Python list
me data in-memory rakha gaya hai.
"""

from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Job Board API")

# Frontend localhost:3000 se backend localhost:8000 ko call karega,
# isliye exact frontend origin ko CORS me allow kar rahe hain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"],
)


class JobListing(BaseModel):
    id: int
    title: str
    company: str
    location: str
    experience: str
    salary: str
    employment_type: str
    posted: str


# Real job-board jaisa sample data. Ye assessment dataset hai,
# live vacancies ya guaranteed openings ka claim nahi karta.
# Real job-board jaisa sample data.
# Ye assessment dataset hai, live vacancies ka claim nahi karta.
JOBS: list[JobListing] = [
    JobListing(
        id=1,
        title="Frontend Developer",
        company="Razorpay",
        location="Bengaluru",
        experience="0–2 yrs",
        salary="₹8–12 LPA",
        employment_type="Full-time",
        posted="2 days ago",
    ),
    JobListing(
        id=2,
        title="Backend Engineer",
        company="PhonePe",
        location="Pune",
        experience="1–3 yrs",
        salary="₹10–16 LPA",
        employment_type="Full-time",
        posted="1 day ago",
    ),
    JobListing(
        id=3,
        title="Software Engineer",
        company="Groww",
        location="Bengaluru",
        experience="0–2 yrs",
        salary="₹9–14 LPA",
        employment_type="Full-time",
        posted="3 days ago",
    ),
    JobListing(
        id=4,
        title="React Developer",
        company="CRED",
        location="Bengaluru",
        experience="1–3 yrs",
        salary="₹10–15 LPA",
        employment_type="Full-time",
        posted="4 days ago",
    ),
    JobListing(
        id=5,
        title="Full Stack Developer",
        company="Meesho",
        location="Bengaluru",
        experience="1–4 yrs",
        salary="₹11–18 LPA",
        employment_type="Full-time",
        posted="5 days ago",
    ),
    JobListing(
        id=6,
        title="Node.js Developer",
        company="Myntra",
        location="Bengaluru",
        experience="1–3 yrs",
        salary="₹9–15 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
    JobListing(
        id=7,
        title="Junior Software Engineer",
        company="Zepto",
        location="Mumbai",
        experience="0–1 yrs",
        salary="₹7–11 LPA",
        employment_type="Full-time",
        posted="2 days ago",
    ),
    JobListing(
        id=8,
        title="Frontend Engineer",
        company="Swiggy",
        location="Hyderabad",
        experience="1–3 yrs",
        salary="₹10–16 LPA",
        employment_type="Full-time",
        posted="6 days ago",
    ),
    JobListing(
        id=9,
        title="Associate Developer",
        company="Freshworks",
        location="Chennai",
        experience="0–2 yrs",
        salary="₹7–12 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
    JobListing(
        id=10,
        title="Software Developer",
        company="Zoho",
        location="Chennai",
        experience="1–3 yrs",
        salary="₹6–10 LPA",
        employment_type="Full-time",
        posted="3 days ago",
    ),
    JobListing(
        id=11,
        title="Frontend Engineer",
        company="Jupiter",
        location="Mumbai",
        experience="1–3 yrs",
        salary="₹9–14 LPA",
        employment_type="Full-time",
        posted="2 days ago",
    ),
    JobListing(
        id=12,
        title="Backend Developer",
        company="BrowserStack",
        location="Mumbai",
        experience="1–4 yrs",
        salary="₹11–18 LPA",
        employment_type="Full-time",
        posted="4 days ago",
    ),
    JobListing(
        id=13,
        title="React Developer",
        company="Zerodha",
        location="Bengaluru",
        experience="1–3 yrs",
        salary="₹10–16 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
    JobListing(
        id=14,
        title="Full Stack Engineer",
        company="Postman",
        location="Bengaluru",
        experience="2–4 yrs",
        salary="₹14–22 LPA",
        employment_type="Full-time",
        posted="5 days ago",
    ),
    JobListing(
        id=15,
        title="Software Engineer I",
        company="Walmart Global Tech",
        location="Chennai",
        experience="0–2 yrs",
        salary="₹8–13 LPA",
        employment_type="Full-time",
        posted="3 days ago",
    ),
    JobListing(
        id=16,
        title="Web Developer",
        company="TCS",
        location="Pune",
        experience="0–2 yrs",
        salary="₹5–8 LPA",
        employment_type="Full-time",
        posted="2 days ago",
    ),
    JobListing(
        id=17,
        title="Frontend Developer",
        company="Infosys",
        location="Hyderabad",
        experience="0–2 yrs",
        salary="₹5–9 LPA",
        employment_type="Full-time",
        posted="6 days ago",
    ),
    JobListing(
        id=18,
        title="JavaScript Developer",
        company="Accenture",
        location="Mumbai",
        experience="1–3 yrs",
        salary="₹7–12 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
    JobListing(
        id=19,
        title="Software Engineer",
        company="Microsoft",
        location="Hyderabad",
        experience="1–3 yrs",
        salary="₹18–28 LPA",
        employment_type="Full-time",
        posted="4 days ago",
    ),
    JobListing(
        id=20,
        title="Frontend Engineer",
        company="Adobe",
        location="Noida",
        experience="1–3 yrs",
        salary="₹12–20 LPA",
        employment_type="Full-time",
        posted="5 days ago",
    ),
    JobListing(
        id=21,
        title="Backend Engineer",
        company="Atlassian",
        location="Bengaluru",
        experience="2–4 yrs",
        salary="₹18–30 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
    JobListing(
        id=22,
        title="UI Engineer",
        company="Walmart",
        location="Bengaluru",
        experience="1–3 yrs",
        salary="₹10–17 LPA",
        employment_type="Full-time",
        posted="3 days ago",
    ),
    JobListing(
        id=23,
        title="Full Stack Developer",
        company="Dream11",
        location="Mumbai",
        experience="1–4 yrs",
        salary="₹12–20 LPA",
        employment_type="Full-time",
        posted="2 days ago",
    ),
    JobListing(
        id=24,
        title="Software Developer",
        company="MakeMyTrip",
        location="Gurugram",
        experience="0–2 yrs",
        salary="₹7–12 LPA",
        employment_type="Full-time",
        posted="6 days ago",
    ),
    JobListing(
        id=25,
        title="Frontend Developer",
        company="Paytm",
        location="Noida",
        experience="0–2 yrs",
        salary="₹7–11 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
    JobListing(
        id=26,
        title="Node.js Engineer",
        company="Urban Company",
        location="Gurugram",
        experience="1–3 yrs",
        salary="₹9–15 LPA",
        employment_type="Full-time",
        posted="4 days ago",
    ),
    JobListing(
        id=27,
        title="React Engineer",
        company="Ola",
        location="Bengaluru",
        experience="1–3 yrs",
        salary="₹9–14 LPA",
        employment_type="Full-time",
        posted="3 days ago",
    ),
    JobListing(
        id=28,
        title="Software Engineer",
        company="Ather Energy",
        location="Bengaluru",
        experience="0–2 yrs",
        salary="₹8–13 LPA",
        employment_type="Full-time",
        posted="5 days ago",
    ),
    JobListing(
        id=29,
        title="Frontend Developer",
        company="Acko",
        location="Bengaluru",
        experience="1–3 yrs",
        salary="₹10–16 LPA",
        employment_type="Full-time",
        posted="2 days ago",
    ),
    JobListing(
        id=30,
        title="Backend Developer",
        company="CoinDCX",
        location="Mumbai",
        experience="1–4 yrs",
        salary="₹11–18 LPA",
        employment_type="Full-time",
        posted="1 week ago",
    ),
]

class PaginatedResponse(BaseModel):
    items: list[JobListing]
    total: int
    page: int
    limit: int
    total_pages: int


@app.get("/api/jobs", response_model=PaginatedResponse)
def get_jobs(
    page: int = Query(1, ge=1, description="1-indexed page number"),
    limit: int = Query(6, ge=1, le=50, description="items per page"),
    search: str = Query("", description="search jobs by title, company, location or type"),
):
    """Search + pagination ka logic backend par rakha hai."""

    # Search ko case-insensitive bana rahe hain taaki user ko exact casing yaad na rakhni pade.
    query = search.strip().lower()

    if query:
        filtered_jobs = [
            job
            for job in JOBS
            if query in job.title.lower()
            or query in job.company.lower()
            or query in job.location.lower()
            or query in job.experience.lower()
            or query in job.employment_type.lower()
        ]
    else:
        filtered_jobs = JOBS

    total = len(filtered_jobs)
    total_pages = max(1, (total + limit - 1) // limit)

    # Search ke baad bhi pagination edge case properly handle hona chahiye.
    if page > total_pages:
        raise HTTPException(
            status_code=404,
            detail=f"Page {page} exist nahi karta. Max page hai {total_pages}.",
        )

    start = (page - 1) * limit
    end = start + limit
    page_items = filtered_jobs[start:end]

    return PaginatedResponse(
        items=page_items,
        total=total,
        page=page,
        limit=limit,
        total_pages=total_pages,
    )


@app.get("/")
def health_check():
    return {"status": "job board ready", "docs": "/docs"}
