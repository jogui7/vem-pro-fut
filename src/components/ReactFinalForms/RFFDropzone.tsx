import {
  CircularProgress, FormHelperText, makeStyles, Typography,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import classnames from 'classnames';
import { useEffect, useState } from 'react';
import Dropzone from 'react-dropzone';
import { Field, FieldInputProps } from 'react-final-form';
import { getMediaCover, IMedia, readImageAsBase64 } from '../../lib/MediasLib';
import PickMedia from '../FormInputs/PickMedia';
import MediaActionButton from '../MediaActionButton';
import useMediaStyles, { buildMediaActionStyles } from '../useMediaStyles';

const DEFAULT_TITLE = 'Clique ou arraste um arquivo!';
const DEFAULT_MAX_SIZE = 2097152;

const useStyles = makeStyles((theme) => ({
  addButtonContainer: {
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: theme.spacing(20),
    height: theme.spacing(20),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[100],
    },
  },
  listEmpty: {
    color: theme.palette.text.primary,
    position: 'relative',
  },
  dropzone: {
    padding: theme.spacing(4),
    textAlign: 'center',
  },
  dropzoneContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.palette.primary.light,
    borderRadius: theme.shape.borderRadius,
  },
  dragHover: {
    border: `2px dashed ${theme.palette.primary.light}`,
  },
  mediaActionContainer: {
    position: 'relative',
    height: '100%',
    ...buildMediaActionStyles(),
  },
  img: {
    objectFit: 'cover',
    borderRadius: theme.spacing(1 / 2),
  },
  toTheRight: {
    justifyContent: 'flex-end',
  },
}));

type AcceptType = 'image/*' | 'video/*';
type RFFDropzoneProps = {
  defaultValue?: string | [string];
  multiple?: boolean;
  name: string;
  fileMaxSize?: number;
  acceptTypes: AcceptType[];
  title?: string;
  formatValue: (files: File | Array<File>) => Promise<string>;
  onClear?: () => void;
};

const buildDefaultValue = (files: string | string[] | undefined): IMedia[] => {
  if (!files) {
    return [];
  }
  const filesUrl = Array.isArray(files) ? files : [files];
  const filesWithCover = filesUrl.map((url) => ({ url }));
  return filesWithCover;
};

const RFFDropzone = ({
  multiple,
  defaultValue,
  name,
  acceptTypes,
  title,
  onClear,
  formatValue,
  fileMaxSize,
}: RFFDropzoneProps) => {
  const [drag, setDrag] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [filesUrl, setfilesUrl] = useState<IMedia[]>([]);
  const [invalidSize, setInvalidSize] = useState<boolean>(false);
  const classes = useStyles();
  const mediaClasses = useMediaStyles();

  useEffect(() => {
    setfilesUrl(buildDefaultValue(defaultValue));
  }, [defaultValue]);

  const isAllFileSizeValid = (files: File[], maxSize: number) => {
    // eslint-disable-next-line consistent-return
    files.forEach((file) => {
      if (file.size > maxSize) {
        return false;
      }
    });

    return true;
  };

  const onChange = async (files: File[], fileInput: FieldInputProps<any, HTMLElement>) => {
    setLoading(true);
    const isValid = fileMaxSize && isAllFileSizeValid(files, fileMaxSize);
    setInvalidSize(!isValid);

    if (!isValid) {
      setLoading(false);
      return;
    }

    const newfilesUrl: IMedia[] = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < files.length; index++) {
      const currentFile = files[index];
      // eslint-disable-next-line no-await-in-loop
      const fb64 = await readImageAsBase64(currentFile);
      newfilesUrl.push({ file: currentFile, url: fb64 as string });
    }

    setfilesUrl(newfilesUrl);

    const proccessedFiles = await formatValue(multiple ? files : files[0]);

    fileInput.onChange(proccessedFiles);

    setLoading(false);
  };

  const accept = acceptTypes.join(',');
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const onAdd = (files: File[]) => {
          onChange(files, input);
        };

        const handleClean = () => {
          input.onChange(undefined);
          setfilesUrl([]);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          onClear && onClear();
        };

        if (filesUrl.length > 0) {
          return (
            <div className={classes.mediaActionContainer}>
              {filesUrl.map((fileB64, index) => (
                <img
                  key={`file-${index}`}
                  alt={fileB64?.file?.name ?? `file-${index}`}
                  src={getMediaCover(fileB64)}
                  width="100%"
                  height="100%"
                  className={classes.img}
                />
              ))}

              <div className={classnames(mediaClasses.mediaControlsTop, classes.toTheRight)}>
                <MediaActionButton onClick={handleClean}>
                  <DeleteIcon />
                </MediaActionButton>
              </div>
            </div>
          );
        }

        return (
          <>
            <Dropzone
              accept={accept}
              onDropAccepted={(files: File[]) => onChange(files, input)}
              noClick
              onDrop={() => setDrag(false)}
              onDragEnter={() => setDrag(true)}
              onDragLeave={() => setDrag(false)}
            >
              {({ getRootProps }: any) => (
                <div {...getRootProps()} className={classnames(classes.dropzoneContainer)}>
                  <div className={classnames(classes.dropzone, drag ? classes.dragHover : '')}>
                    <PickMedia id={`pick-image-${name}`} onChange={onAdd} accept={accept}>
                      <Grid container justify="center" alignItems="center">
                        <Grid item>
                          <div className={classes.addButtonContainer}>
                            {loading ? (
                              <CircularProgress />
                            ) : (
                              <AddIcon color="primary" fontSize="large" />
                            )}
                          </div>
                        </Grid>
                      </Grid>
                      <Typography>{title}</Typography>
                      {invalidSize && (
                        <Typography variant="caption" color="primary">
                          Selecione arquivo
                          {multiple ? 's' : ''} com até{' '}
                          {Math.floor((fileMaxSize || DEFAULT_MAX_SIZE) / 1000000)}
                          MB
                        </Typography>
                      )}
                    </PickMedia>
                  </div>
                </div>
              )}
            </Dropzone>
            {meta.invalid && <FormHelperText error>Selecione um arquivo válido</FormHelperText>}
          </>
        );
      }}
    </Field>
  );
};

RFFDropzone.defaultProps = {
  defaultValue: null,
  multiple: false,
  fileMaxSize: DEFAULT_MAX_SIZE,
  title: DEFAULT_TITLE,
  onClear: () => { },
};

export default RFFDropzone;
