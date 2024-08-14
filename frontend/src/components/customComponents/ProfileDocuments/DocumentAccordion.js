import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/material';
import DocumentUpload from './DocumentUpload';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDocument } from '../../../store/slices/documents';
import moment from 'moment';

export default function DisabledAccordion({ name, expiryDate, documentUrl, doc }) {
  const dispatch = useDispatch()

  const handleDelete = () => {
    dispatch(deleteDocument(doc))
  }

  return(
    <div>
      <Accordion sx={{ mb: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Box sx={{ width: '80%', display: 'flex', alignItems: 'center',}}>
            { documentUrl ? <CheckIcon color='success' /> : <CloseIcon color='warning' /> }
            <Typography variant='h6' mx={6}>{name}</Typography>
            {documentUrl && expiryDate && <Typography alignSelf='center'>Exp: {moment(expiryDate).format('DD MMM YYYY') }</Typography>}
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ display:'flex', justifyContent: 'space-around' }} >
          <Box>
            { documentUrl ? 
              <Box>
                <embed src={documentUrl} alt={name} style={{ width: '100%', height: 'auto' }} />
                <Link to={documentUrl} target='_blank'>
                  <Button variant='outlined' color='primary' fullWidth>Download</Button>
                </Link>
                <Button onClick={handleDelete} variant='outlined' color='warning' sx={{ marginTop: 1}} fullWidth>Delete</Button>
              </Box>
              : 
              <DocumentUpload name={name} /> 
            }

          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}


