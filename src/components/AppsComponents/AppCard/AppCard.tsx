import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoIcon } from '../../../assets/info.svg';
import { ReactComponent as LinkIcon } from '../../../assets/link.svg';
import { ReactComponent as PlusIcon } from '../../../assets/plus.svg';

export const AppCard: FC<AppCardProps> = (props) => {
  const { t } = useTranslation();
  const [image, setImage] = useState('');

  const { id } = props;

  useEffect(() => {
    import(`../../../assets/apps/${id}.png`)
      .then((image) => {
        setImage(image.default);
      })
      .catch((e) => {
        // use fallback icon if image for id doesn't exist
        import('../../../assets/cloud.svg').then((img) => setImage(img.default));
      });
  }, [id]);

  return (
    <div className='bd-card dark:bg-gray-600 transition-colors'>
      <div className='h-4/6 flex flex-row mt-2 items-center w-full'>
        {/* Icon */}
        <div className='w-1/4 flex justify-center items-center p-2'>
          <img className='max-h-16' src={image} alt={`${props.id} Logo`} />
        </div>
        {/* Content */}
        <div className='w-3/4 justify-center items-start flex flex-col text-xl'>
          <div>{props.name}</div>
          <div className='text-gray-500 text-base overflow-ellipsis dark:text-gray-200'>{props.description}</div>
        </div>
      </div>
      <div className='h-2/6 py-2 flex flex-row gap-2'>
        {props.installed && props.address && (
          <a
            href={props.address}
            target='_blank'
            rel='noreferrer'
            className='w-1/2 rounded shadow-md flex justify-center items-center p-2 text-white bg-yellow-500 hover:bg-yellow-400'
          >
            <LinkIcon />
            &nbsp;{t('apps.open')}
          </a>
        )}
        {props.installed && !props.address && (
          <button
            disabled={true}
            className='w-1/2 rounded shadow-md flex justify-center items-center p-2 text-white bg-gray-400 cursor-default'
          >
            {t('apps.no_page')}
          </button>
        )}
        {!props.installed && (
          <button
            disabled={props.installing}
            className='w-1/2 rounded shadow-md flex justify-center items-center p-2 text-white bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-400 disabled:text-white disabled:pointer-events-none'
            onClick={() => props.onInstall(id)}
          >
            <PlusIcon />
            &nbsp;{t('apps.install')}
          </button>
        )}
        <button
          className='w-1/2 rounded shadow-md flex justify-center items-center p-2 dark:bg-gray-500 hover:bg-gray-300 dark:hover:bg-gray-300 dark:hover:text-black'
          onClick={() => props.onOpenDetails(id)}
        >
          <InfoIcon />
          &nbsp;{t('apps.info')}
        </button>
      </div>
    </div>
  );
};

export default AppCard;

export interface AppCardProps {
  id: string;
  name: string;
  description: string;
  installed: boolean;
  installing: boolean;
  address?: string;
  onInstall: (id: string) => void;
  onOpenDetails: (id: string) => void;
}
