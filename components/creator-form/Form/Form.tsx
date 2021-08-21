import useLanguageContext from 'context/languageContext';
import { MAX_CREATOR_BIO_LENGTH } from 'global-constants';
import type { FormProps } from './index';

import InputAdornment from '@material-ui/core/InputAdornment';
import Dropzone from 'components/Dropzone';
import TextField from 'components/TextField';
import Tip from 'components/Tip';
import GradientButton from 'components/GradientButton';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';

import { makeStyles } from '@material-ui/core/styles';
import styles from './Form.styles';
const useStyles = makeStyles(styles);

const Form = (props: FormProps) => {
    const { CreatorForm: text } = useLanguageContext().appText;
    const classes = useStyles();

    return (
        <form className={classes.root} onSubmit={props.onSubmit}>
            <div className={classes.formContent}>
                <div className={classes.header}>
                    <div className={classes.headerGradient} />
                    <div>
                        <h2 className={classes.title}>{props.creatorName},</h2>
                        <h3 className={classes.subtitle}>{text.headerTitle}</h3>
                    </div>
                </div>
                {props.showDropzone &&
                    <>
                        <div>
                            <h2 className={classes.title}>{text.profilePicture}</h2>
                            <h5 className={classes.subtitle}>{text.showSmile}</h5>
                        </div>
                        <Dropzone
                        dropzoneClassName={classes.photoDropzone}
                        addButtonClassName={classes.addIcon}
                        deleteButtonClassName={classes.deleteIcon}
                        previewImageClassName={classes.photoPreview}
                        image={props.photo}
                        onFileDrop={props.onPhotoChange} />
                    </>}
                <div className={classes.fieldContainer}>
                    <h2 className={classes.title}>{text.aboutYouTitle}</h2>
                    <h5 className={classes.subtitle}>{text.aboutYouSubtitle}</h5>
                    <Tip className={classes.tip}>{text.aboutYouTip}</Tip>
                    <TextField
                    multiline 
                    minRows={4}
                    maxRows={4}
                    required
                    className={classes.aboutYouTextField}
                    value={props.bio}
                    onChange={e => {
                        if (e.target.value.length <= MAX_CREATOR_BIO_LENGTH) {
                            props.onBioChange(e.target.value);
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                {MAX_CREATOR_BIO_LENGTH - props.bio.length}
                            </InputAdornment>
                        )
                    }} />
                </div>
                <h2 className={classes.title}>{text.phoneNumberTitle}</h2>
                <h5 className={classes.subtitle}>{text.phoneNumberSubtitle}</h5>
                <TextField
                required
                type="tel"
                className={classes.phoneTextField}
                value={props.phoneNumber}
                onChange={e => props.onPhoneNumberChange(e.target.value)} />
                <div className={classes.fieldContainer}>
                    <h2 className={classes.title}>{text.idTitle}</h2>
                    <h5 className={classes.subtitle}>{text.idSubtitle}</h5>
                    <Tip className={classes.tip} icon={faLock}>{text.idTip1}</Tip>
                    <Tip className={classes.tip}>{text.idTip2}</Tip>
                    <div className={classes.idsContainer}>
                        <div className={classes.idDropzoneContainer}>
                            <p className={classes.idDropzoneTitle}>
                                {text.front}
                            </p>
                            <p className={classes.idDropzoneSubtitle}>
                                {text.frontIdText}
                            </p>
                            <Dropzone
                            dropzoneClassName={classes.idDropzone}
                            addButtonClassName={classes.addIcon}
                            deleteButtonClassName={classes.deleteIcon}
                            previewImageClassName={classes.idPreview}
                            image={props.frontId}
                            onFileDrop={props.onFrontIdChange}>
                                <span className={classes.idDropzoneText}>
                                    {text.addFront}
                                </span>
                            </Dropzone>
                        </div>
                        <div className={classes.idDropzoneContainer}>
                            <p className={classes.idDropzoneTitle}>
                                {text.back}
                            </p>
                            <p className={classes.idDropzoneSubtitle}>
                                {text.backIdText}
                            </p>
                            <Dropzone
                            dropzoneClassName={classes.idDropzone}
                            addButtonClassName={classes.addIcon}
                            deleteButtonClassName={classes.deleteIcon}
                            previewImageClassName={classes.idPreview}
                            image={props.backId}
                            onFileDrop={props.onBackIdChange}>
                                <span className={classes.idDropzoneText}>
                                    {text.addBack}
                                </span>
                            </Dropzone>
                        </div>
                    </div>
                </div>
            </div>
            <footer className={classes.footer}>
                <GradientButton 
                type="submit" 
                variant="creator" 
                className={classes.doneButton}
                disabled={props.submitDisabled}>
                    {text.done}
                </GradientButton>
            </footer>
        </form>
    );
}

export default Form;