import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    Button,
    Tooltip
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Bid = {
    bidId: string;
    freelancerId: string;
    bidAmount: number;
    deliveryTime: number;
    status: string;
};

const ListAllBids: React.FC = () => {
    const { projectId } = useParams<{ projectId: string }>();
    const { t } = useTranslation();
    const [bids, setBids] = useState<Bid[]>([]);
    const [projectName, setProjectName] = useState<string>('Loading...');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!projectId) {
                setError(t('projectNotFound'));
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Fetch project name
                const projectResponse = await axios.get(`http://localhost:5000/api/projects/${projectId}`);
                setProjectName(projectResponse.data.title || 'Unknown Project');

                // Fetch bids for the project
                const bidsResponse = await axios.get(`http://localhost:5000/api/bids/projects/${projectId}`);
                setBids(bidsResponse.data);
                setLoading(false);
            } catch (err: any) {
                console.error('Error fetching data:', {
                    message: err.message,
                    response: err.response?.data || 'No response from server',
                });

                if (err.response?.status === 404) {
                    setBids([]);
                } else {
                    setError(t('fetchError'));
                }
                setLoading(false);
            }
        };

        fetchProjectDetails();
    }, [projectId, t]);

    const handleStatusChange = async (bidId: string, newStatus: string) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/bids/${bidId}/status`, { status: newStatus });
            setBids((prevBids) =>
                prevBids.map((bid) =>
                    bid.bidId === bidId ? { ...bid, status: response.data.status } : bid
                )
            );
            setSnackbar({
                open: true,
                message: t('statusUpdated', { status: newStatus }),
                severity: 'success',
            });
        } catch (err: any) {
            console.error('Error updating status:', {
                message: err.message,
                response: err.response?.data || 'No response from server',
            });
            setSnackbar({
                open: true,
                message: t('statusUpdateError'),
                severity: 'error',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleBack = () => {
        window.history.back(); // Navigate to the previous page
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }
    const handleFreelancerClick = (freelancerId: string) => {
        // Navigate to the freelancer profile list page
        navigate(`/freelancer-profiles/${freelancerId}`);
        console.log(freelancerId);
    };

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
            {bids.length === 0 ? (
                <Typography variant="h6" sx={{ textAlign: 'center' }}>
                    {t('noBids')}
                </Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('freelancerId')}</TableCell>
                                <TableCell align="right">{t('bidAmount')}</TableCell>
                                <TableCell align="right">{t('deliveryTime')}</TableCell>
                                <TableCell align="center">{t('status')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bids.map((bid) => (
                                <TableRow key={bid.bidId}>
                                    <TableCell>
                             <Tooltip title="View Profile" arrow>
                                            <button
                                                onClick={() => handleFreelancerClick(bid.freelancerId)}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'blue',
                                                    cursor: 'pointer',
                                                    textDecoration: 'underline',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {bid.freelancerId} {/* Display freelancer name */}
                                            </button>
                                        </Tooltip>
                                        {/* {bid.freelancerId} */}
                                    </TableCell>
                                    <TableCell align="right">{bid.bidAmount}</TableCell>
                                    <TableCell align="right">{bid.deliveryTime}</TableCell>
                                    <TableCell align="center">
                                        <Select
                                            value={bid.status}
                                            onChange={(e) => handleStatusChange(bid.bidId, e.target.value)}
                                            disabled={bid.status !== 'pending'}
                                            sx={{
                                                height: '30px',
                                                fontSize: '14px',
                                            }}
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        maxHeight: '200px',
                                                    },
                                                },
                                            }}
                                        >
                                            <MenuItem value="pending">{t('pending')}</MenuItem>
                                            <MenuItem value="accepted">{t('accepted')}</MenuItem>
                                            <MenuItem value="rejected">{t('rejected')}</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleBack}
                >
                    {t('backButton')}
                </Button>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ListAllBids;
