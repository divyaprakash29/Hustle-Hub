import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Button, Box, Typography, Grid, Paper } from "@mui/material";

// Register necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define a type for User and Project objects
interface User {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    role: string;
}

interface Project {
    _id: string;
    title: string;
    clientId: string; // Assuming the client who posted the project
    createdAt: string;
}

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [chartData, setChartData] = useState<any>(null);
    const [projectChartData, setProjectChartData] = useState<any>(null);

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authorization token found.");
            }

            const response = await fetch("http://localhost:5000/api/users", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const usersData = data.data; // Assuming the data is wrapped in a `data` field

            if (!Array.isArray(usersData)) {
                throw new Error("Invalid data format. Expected an array in 'data' field.");
            }

            setUsers(usersData); // Set the users data to the state

            // Call the function to generate the chart for user roles
            generateUserRoleChart(usersData);

        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Function to fetch project data
    const fetchProjectData = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/projects", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const projectsData = data; // Assuming the data is wrapped in a `data` field

            if (!Array.isArray(projectsData)) {
                throw new Error("Invalid data format. Expected an array in 'data' field.");
            }

            setProjects(projectsData); // Set the projects data to the state

            // Call the function to generate the chart for projects posted by clients
            generateProjectChart(projectsData);

        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    // Function to generate the chart for user roles
    const generateUserRoleChart = (usersData: User[]) => {
        const roleCounts = usersData.reduce((acc: any, user: User) => {
            acc[user.role] = (acc[user.role] || 0) + 1;
            return acc;
        }, {});

        // Format chart data for Bar chart
        setChartData({
            labels: Object.keys(roleCounts),
            datasets: [
                {
                    label: "Number of Users",
                    data: Object.values(roleCounts),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        });
    };

    // Function to generate the chart for projects posted by clients
    const generateProjectChart = (projectsData: Project[]) => {
        const clientProjectCounts = projectsData.reduce((acc: any, project: Project) => {
            acc[project.clientId] = (acc[project.clientId] || 0) + 1;
            return acc;
        }, {});

        // Fetch the client names (for chart labels)
        const clientNames = Object.keys(clientProjectCounts);

        // Format chart data for Bar chart
        setProjectChartData({
            labels: clientNames,
            datasets: [
                {
                    label: "Number of Projects Posted",
                    data: clientNames.map(clientId => clientProjectCounts[clientId]),
                    backgroundColor: "rgba(153, 102, 255, 0.2)",
                    borderColor: "rgba(153, 102, 255, 1)",
                    borderWidth: 1,
                },
            ],
        });
    };

    // Function to generate the Excel file
    const generateExcelFile = () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("No authorization token found.");
            }

            const worksheet = XLSX.utils.json_to_sheet(users);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users Report");

            // Generate Excel file and trigger download
            XLSX.writeFile(workbook, "Users_Report.xlsx");
        } catch (error) {
            console.error("Error generating Excel file:", error);
        }
    };

    useEffect(() => {
        // Fetch user and project data when the component mounts
        fetchUserData();
        fetchProjectData();
    }, []);

    return (
        <Box sx={{ padding: 4 }}>
            {/* Download Excel Button */}
            <Button
                variant="contained"
                color="primary"
                onClick={generateExcelFile}
                sx={{ marginBottom: 3 }}
            >
                Download Excel
            </Button>

            {/* User Role Distribution Chart */}
            {chartData && (
                <Paper sx={{ padding: 2, marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        User Roles Distribution
                    </Typography>
                    <Bar data={chartData} />
                </Paper>
            )}

            {/* Projects Posted by Clients Chart */}
            {projectChartData && (
                <Paper sx={{ padding: 2 }}>
                    <Typography variant="h5" gutterBottom>
                        Projects Posted by Clients
                    </Typography>
                    <Bar data={projectChartData} />
                </Paper>
            )}
        </Box>
    );
}
