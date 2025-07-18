import Empty from "@/foundation/components/empty/Empty";

import { useEffect } from "react";
import UniversalGridManager from "@/foundation/components/list-posts/UniversalGridManager";
import { useNavigate } from "react-router-dom";
import { useBase } from "./hooks/useBase";

import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import {
  selectStatusAddPostSelector,
  selectStatusEditPostSelector,
} from "./slice/base-post.selector";
import { ReduxStateType } from "@/app/store/types";
import FacultyCardSkeleton from "@/foundation/components/loading/FacultyCardSkeleton";
import Pagination from "@/features/posts/components/list-post/Pagination";
import {
  setIdDeletePost,
  setIsDeletePost,
  setIsEditPost,
  setIsEditPostId,
} from "./slice/base-post.slice";

interface ListPostProps {
  categoryId?: number;
  subCategoryId: number;
}
const ListPost = ({ subCategoryId, categoryId }: ListPostProps) => {
  const {
    posts,
    handleGetArticle,
    isDeletePost,
    handleDeletePost,
    deletePostData,
    filter,
    statusGetListPost,
    setFilter,
  } = useBase();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log(categoryId);

  const handlePageChange = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
  };

  const postsData = posts.content;
  const totalPages = posts.totalPages;
  const totalItems = posts.totalItems;
  const getStatusAddPost = useSelector(selectStatusAddPostSelector);
  const getStatusEditPost = useSelector(selectStatusEditPostSelector);

  // call api add post
  useEffect(() => {
    if (getStatusAddPost === ReduxStateType.SUCCESS) {
      handleGetArticle({
        ...filter,
        categoryId: subCategoryId,
        // subCategoryId: subCategoryId.toString(),
      });
    }
    if (getStatusEditPost === ReduxStateType.SUCCESS) {
      handleGetArticle({
        ...filter,
        categoryId: subCategoryId,
        // subCategoryId: subCategoryId.toString(),
      });
    }
  }, [getStatusAddPost, getStatusEditPost]);

  // call api get post
  useEffect(() => {
    handleGetArticle({
      ...filter,
      categoryId: subCategoryId,
      // subCategoryId: subCategoryId.toString(),
    });
  }, []);
  // call lại khi filter thay đổi
  useEffect(() => {
    handleGetArticle({
      ...filter,
      categoryId: subCategoryId,
      // subCategoryId: subCategoryId.toString(),
    });
  }, [filter, subCategoryId]);

  // Move the early return after all hooks have been called
  if (statusGetListPost === ReduxStateType.LOADING) {
    return <FacultyCardSkeleton count={6} />;
  }

  return (
    <div className="space-y-4">
      {/* Posts Grid */}
      <div className="overflow-auto hidden-scrollbar">
        <UniversalGridManager
          data={postsData}
          emptyMessage={<Empty />}
          cardConfig={{
            showImage: true,
            showBadge: true,
            showMetadata: true,
            showActions: true,
            imageKey: "thumbnailUrl",
            titleKey: "title",
            descriptionKey: "description",
            badgeKey: "status",
          }}
          onEdit={(item) => {
            dispatch(setIsEditPost(true));
            dispatch(setIsEditPostId(item));
          }}
          onDelete={(item) => {
            dispatch(setIsDeletePost(true));
            dispatch(setIdDeletePost(item.id));
          }}
          onView={(item) => navigate(`/posts/${item.id}`)}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={filter.page}
        totalPages={totalPages || 10}
        totalItems={totalItems || 0}
        pageSize={filter.size}
        onPageChange={handlePageChange}
      />
      {isDeletePost && (
        <ModalConfirm
          isOpen={isDeletePost}
          onClose={() => dispatch(setIsDeletePost(false))}
          onConfirm={() => {
            handleDeletePost(deletePostData.id);
          }}
        />
      )}
    </div>
  );
};

export default ListPost;
