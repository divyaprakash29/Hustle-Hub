import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
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
    Alert,
    Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

type Bid = {
    bidId: string;
    projectId: string;
    bidAmount: number;
    deliveryTime: number;
    status: string;
    projectName?: string;
};

const RetrieveFreelancerBids: React.FC = () => {
    const loggedInUser = useSelector((state: RootState) => state.auth);
    const freelancerId = loggedInUser?.id;

    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    const [bids, setBids] = useState<Bid[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [signedContracts, setSignedContracts] = useState<string[]>([]); // Track signed contracts

    // Load signed contracts from local storage on initial render
    useEffect(() => {
        const savedContracts = localStorage.getItem('signedContracts');
        if (savedContracts) {
            setSignedContracts(JSON.parse(savedContracts));
        }
    }, []);

    // Save signed contracts to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('signedContracts', JSON.stringify(signedContracts));
    }, [signedContracts]);

    // Handle signed contract from navigation state
    useEffect(() => {
        const signedBidId = location.state?.signedBidId;
        if (signedBidId && !signedContracts.includes(signedBidId)) {
            setSignedContracts((prev) => [...prev, signedBidId]);
        }
    }, [location.state, signedContracts]);

    const fetchBids = async () => {
        try {
            if (!freelancerId) {
                setError('Freelancer ID is missing. Please log in again.');
                return;
            }

            setLoading(true);
            const bidResponse = await axios.get(
                `http://localhost:5000/api/bids/freelancers/${freelancerId}`
            );

            const bids: Bid[] = bidResponse.data;

            if (!bids.length) {
                setError('No bids found for this freelancer.');
                setLoading(false);
                return;
            }

            const projectNamePromises = bids.map(async (bid) => {
                try {
                    const projectResponse = await axios.get(
                        `http://localhost:5000/api/projects/${bid.projectId}`
                    );
                    return { ...bid, projectName: projectResponse.data.title };
                } catch {
                    return { ...bid, projectName: 'Unknown Project' };
                }
            });

            const bidsWithNames = await Promise.all(projectNamePromises);
            setBids(bidsWithNames);
            setError(null);
        } catch (err) {
            setError('Failed to fetch bids or project details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBids();
    }, [freelancerId]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, textAlign: 'center' }}>
                {t('my-submitted-bid')}
            </Typography>
            {error ? (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('project-name')}</TableCell>
                                <TableCell align="right">{t('bid-amount')}</TableCell>
                                <TableCell align="right">{t('delivery-time')}</TableCell>
                                <TableCell align="center">{t('status')}</TableCell>
                                <TableCell align="center">{t('actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bids.map((bid) => (
                                <TableRow key={bid.bidId}>
                                    <TableCell>{bid.projectName || 'Unknown Project'}</TableCell>
                                    <TableCell align="right">{bid.bidAmount}</TableCell>
                                    <TableCell align="right">{bid.deliveryTime}</TableCell>
                                    <TableCell align="center">{bid.status}</TableCell>
                                    <TableCell align="center">
                                        {signedContracts.includes(bid.bidId) ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    sx={{
                                                        fontSize: '0.8rem',
                                                        padding: '4px 8px',
                                                        minWidth: '80px',
                                                        height: '30px',
                                                        textTransform: 'none',
                                                        whiteSpace: 'nowrap',
                                                    }}
                                                    disabled
                                                >
                                                    {t('sign-contract')}
                                                </Button>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: 'green',
                                                        fontSize: '0.9rem',
                                                        marginLeft: '8px',
                                                        display: 'inline-block',
                                                    }}
                                                >
                                                    {t('contract-signed')}
                                                </Typography>
                                            </Box>
                                        ) : bid.status.toLowerCase() === 'accepted' ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    fontSize: '0.8rem',
                                                    padding: '4px 8px',
                                                    minWidth: '80px',
                                                    height: '30px',
                                                    textTransform: 'none',
                                                    whiteSpace: 'nowrap',
                                                }}
                                                onClick={() =>
                                                    navigate('/contractDetails', { state: { bid } })
                                                }
                                            >
                                                {t('sign-contract')}
                                            </Button>
                                        ) : null}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {/* Back Button */}
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                    variant="contained"
                    color="primary" // Same color as Sign Contract button
                    onClick={() => navigate('/HomeFreelancer')} // Navigate to HomefreelancerPage
                >
                    {t('back')}
                </Button>
            </Box>
        </Box>
    );
};

export default RetrieveFreelancerBids;
