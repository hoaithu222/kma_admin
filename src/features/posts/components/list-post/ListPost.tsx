import Empty from "@/foundation/components/empty/Empty";

import { usePost } from "../../hooks/usePost";
import { useEffect, useState } from "react";
import UniversalGridManager from "@/foundation/components/list-posts/UniversalGridManager";
import { useNavigate } from "react-router-dom";

import FilterPanel from "./FilterPanel";
import Pagination from "./Pagination";
import {
  setIdDeletePost,
  setIsDeletePost,
  setIsEditPost,
  setIsEditPostId,
} from "../../slice/posts.slice";
import { useDispatch, useSelector } from "react-redux";
import ModalConfirm from "@/foundation/components/modal/ModalConfirm";
import {
  selectStatusAddPostSelector,
  selectStatusEditPostSelector,
} from "../../slice/posts.selector";
import { ReduxStateType } from "@/app/store/types";
import FacultyCardSkeleton from "@/foundation/components/loading/FacultyCardSkeleton";
import Button from "@/foundation/components/buttons/Button";
import { Filter } from "lucide-react";

const ListPost = () => {
  const {
    posts,
    handleGetArticle,
    isDeletePost,
    handleDeletePost,
    deletePostData,
    filter,
    statusGetListPost,
    setFilter,
  } = usePost();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    handleGetArticle(filter);
  }, [filter]);

  const handleSearch = () => {
    setFilter((prev) => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    handleGetArticle(filter);
  };

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
      handleGetArticle(filter);
    }
    if (getStatusEditPost === ReduxStateType.SUCCESS) {
      handleGetArticle(filter);
    }
  }, [getStatusAddPost, getStatusEditPost]);

  if (statusGetListPost === ReduxStateType.LOADING) {
    return <FacultyCardSkeleton count={6} />;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3 p-2">
          <Button
            onClick={() => setShowFilter(!showFilter)}
            variant="modernCyan"
            iconLeft={<Filter className="w-4 h-4" />}
          >
            {showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilter && (
        <div className="p-2">
          <FilterPanel
            filter={filter}
            setFilter={setFilter}
            onSearch={handleSearch}
            onReset={handleReset}
          />
        </div>
      )}

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
