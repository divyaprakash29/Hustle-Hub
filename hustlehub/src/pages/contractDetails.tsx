import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Checkbox, FormControlLabel, TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Bid = {
    bidId: string;
    projectId?: string;
    bidAmount: number;
    deliveryTime: number;
    status: string;
    projectName?: string;
};

const ContractDetails: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { bid } = location.state as { bid: Bid }; // Access the passed bid object
    const { t } = useTranslation();
    // State to track if the user agrees to the terms
    const [agreed, setAgreed] = useState(false);

    // State for digital signature
    const [signature, setSignature] = useState('');

    // State to track if the contract is submitted
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle digital signature input
    const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow only letters (both uppercase and lowercase) and spaces
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setSignature(value);
        }
    };

    // Handle contract submission
    const handleSubmitContract = () => {
        if (!agreed) {
            alert('You must agree to the terms and conditions to proceed.');
            return;
        }

        if (!signature.trim()) {
            alert('Please provide your digital signature to proceed.');
            return;
        }

        // Simulating submission
        setIsSubmitted(true);
        alert('Contract submitted successfully!');
        console.log('Submitted Contract Details:', {
            projectName: bid.projectName,
            bidAmount: bid.bidAmount,
            deliveryTime: bid.deliveryTime,
            status: bid.status,
            signature,
        });

        // Navigate back to RetrieveFreelancerBids page with the signed contract ID
        navigate('/retrieve-freelancer-bids', { state: { signedBidId: bid.bidId } });
    };

    if (!bid) {
        return (
            <Box sx={{ textAlign: 'center', mt: 5 }}>
                <Typography variant="h5">{t('noBidDataFound')}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, mx: 'auto', mt: 5, p: 3 }}>
            <Typography variant="h4" sx={{ mb: 4, textAlign: 'left' }}>
                {t('contract_details')}
            </Typography>

            {/* Contract Details Section */}
            <Box>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}><strong>{t('projectName')}:</strong> {bid.projectName}</Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}><strong>{t('bidAmount')}:</strong> ${bid.bidAmount}</Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}><strong>{t('deliveryTime')}:</strong> {bid.deliveryTime} {t('days')}</Typography>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}><strong>{t('status')}:</strong> {bid.status}</Typography>
            </Box>

            {/* Terms and Conditions Section */}
            <Box sx={{ mt: 5 }}>
                <Typography variant="h5" sx={{ mb: 3, textAlign: 'left' }}>
                    {t('terms_and_conditions')}
                </Typography>
                <Box sx={{ mt: 5 }}>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                        1. The freelancer agrees to deliver the project within the agreed delivery time of {bid.deliveryTime} days. Any delay must be communicated and approved by the client in advance.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                        2. The total payment of ${bid.bidAmount} will be made to the freelancer upon successful completion of the project, subject to the client's satisfaction with the deliverables.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                        3. The freelancer is expected to maintain strict confidentiality regarding the project details and any client-provided resources or materials.
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'justify' }}>
                        4. Any breach of these terms may result in the termination of the contract and withholding of payment.
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: 'justify' }}>
                        5. The freelancer is required to ensure that all deliverables are original and free from plagiarism. The client reserves the right to request revisions if the deliverables do not meet the agreed-upon specifications.
                    </Typography>
                </Box>
            </Box>

            {/* Agreement Checkbox */}
            <Box sx={{ mt: 4 }}>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            color="primary"
                            disabled={isSubmitted} // Disable checkbox when submitted
                        />
                    }
                    label={t('agreeTerms')}
                    sx={{ textAlign: 'left' }}
                />
            </Box>

            {/* Digital Signature Field */}
            <Box sx={{ mt: 4 }}>
                <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}>
                    Please provide your digital signature below:
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder={t('digitalSignature')}
                    value={signature}
                    onChange={handleSignatureChange} // Only allow text input
                    disabled={isSubmitted} // Disable text field when submitted
                />
            </Box>

            {/* Submit Contract Button */}
            <Box sx={{ mt: 4, textAlign: 'right' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmitContract}
                    disabled={isSubmitted || !agreed || !signature.trim()} // Disable after submission
                >
                    {t('submitContract')}
                </Button>
            </Box>
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

export default ContractDetails;
