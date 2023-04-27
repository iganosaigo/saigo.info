import React from 'react';
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from '@ajna/pagination';
import { useAppSelector, useAppDispatch, selectPages } from '../../redux/hooks';
import { setCurrentPage as reduxSetCurrentPage } from '../../redux/slices/pagesSlice';
import { GoChevronRight, GoChevronLeft } from 'react-icons/go';
import { Icon } from '@chakra-ui/react';

export const Paginator: React.FC<{}> = () => {
  const dispatch = useAppDispatch();

  const { currentPage, totalPages, pageSize, totalRecords } =
    useAppSelector(selectPages);

  const outerLimit = 1;
  const innerLimit = 1;
  const { setCurrentPage, pages } = usePagination({
    total: totalRecords,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    pagesCount: totalPages,
    initialState: { currentPage, pageSize },
  });

  const handleClickPageNumber = (pageNumber: number) => {
    // setCurrentPage(pageNumber);
    dispatch(reduxSetCurrentPage(pageNumber));
    window.scrollTo(0, 0);
  };
  return (
    <Pagination
      pagesCount={totalPages}
      currentPage={currentPage}
      onPageChange={handleClickPageNumber}
    >
      <PaginationContainer>
        <PaginationPrevious mx="2" w="8" h="8" fontSize="sm" rounded="md">
          <Icon as={GoChevronLeft} />
        </PaginationPrevious>
        <PaginationPageGroup>
          {pages.map((page: number) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              w="8"
              h="8"
              bg="gray.300"
              fontSize="sm"
              variant="outline"
              _hover={{
                bg: 'teal.400',
                rounded: 'md',
                boxShadow: 'lg',
                shadow: 'md',
              }}
              _current={{
                rounded: 'md',
                boxShadow: 'lg',
                shadow: 'md',
                color: 'white',
                w: 8,
                h: 8,
                bg: 'teal.400',
                fontSize: 'sm',
                _hover: {
                  bg: 'teal.400',
                },
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext mx="2" w="8" h="8" fontSize="sm" rounded="md">
          <Icon as={GoChevronRight} />
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
};
