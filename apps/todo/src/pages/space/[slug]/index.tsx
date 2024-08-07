import { useCreateList, useFindManyList } from '@erikdakoda/database/hooks';
import type { List, Space, User, OwnedItem } from '@erikdakoda/database';
import BreadCrumb from '@/components/BreadCrumb';
import SpaceMembers from '@erikdakoda/auth-ui/components/SpaceMembers';
import TodoList from '@erikdakoda/todo-ui/components/TodoList';
import WithNavBar from '@/components/WithNavBar';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { getEnhancedPrisma } from '@erikdakoda/database/server/getEnhancedPrisma';

function CreateDialog() {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [_private, setPrivate] = useState(false);

  const createList = useCreateList({
    onSuccess: () => {
      toast.success('List created successfully!');

      // reset states
      setTitle('');
      setPrivate(false);

      // close modal
      setModalOpen(false);
    },
  }).mutateAsync;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (modalOpen) {
      inputRef.current?.focus();
    }
  }, [modalOpen]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    void createList({
      data: {
        title,
        private: _private,
      },
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="create-list-modal"
        className="modal-toggle"
        checked={modalOpen}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setModalOpen(e.currentTarget.checked);
        }}
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-xl mb-8">Create a Todo list</h3>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <label htmlFor="title" className="text-lg inline-block w-20">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  required
                  placeholder="Title of your list"
                  ref={inputRef}
                  className="input input-bordered w-full max-w-xs mt-2"
                  value={title}
                  onChange={(e: FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                />
              </div>
              <div className="flex items-center">
                <label htmlFor="private" className="text-lg inline-block w-20">
                  Private
                </label>
                <input
                  id="private"
                  type="checkbox"
                  className="checkbox"
                  onChange={(e: FormEvent<HTMLInputElement>) => setPrivate(e.currentTarget.checked)}
                />
              </div>
            </div>
            <div className="modal-action">
              <input className="btn btn-primary" type="submit" value="Create" />
              <label htmlFor="create-list-modal" className="btn btn-outline">
                Cancel
              </label>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

type Props = {
  space: Space;
  lists: (List & { owner: User } & OwnedItem)[];
};

export default function SpaceHome(props: Props) {
  const router = useRouter();

  const { data: lists } = useFindManyList(
    {
      where: {
        space: {
          slug: router.query.slug as string,
        },
      },
      include: {
        owner: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    },
    {
      initialData: props.lists,
    },
  );

  return (
    <WithNavBar>
      <div className="px-8 py-2">
        <BreadCrumb space={props.space} />
      </div>
      <div className="p-8">
        <div className="w-full flex flex-col md:flex-row mb-8 space-y-4 md:space-y-0 md:space-x-4">
          <label htmlFor="create-list-modal" className="btn btn-primary btn-wide modal-button">
            Create a list
          </label>
          <SpaceMembers />
        </div>

        <ul className="flex flex-wrap gap-6">
          {lists?.map((list) => (
            <li key={list.id}>
              <TodoList value={list} />
            </li>
          ))}
        </ul>

        <CreateDialog />
      </div>
    </WithNavBar>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async ({ req, res, params }) => {
  const db = await getEnhancedPrisma({ req, res });

  const space = await db.space.findUnique({
    where: { slug: params!.slug as string },
  });
  if (!space) {
    return {
      notFound: true,
    };
  }

  const lists = await db.list.findMany({
    where: {
      space: { slug: params?.slug as string },
    },
    include: {
      owner: true,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return {
    props: { space, lists },
  };
};
