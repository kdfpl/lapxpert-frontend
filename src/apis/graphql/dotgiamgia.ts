import gql from "graphql-tag";
import { apolloClient } from "../../apollo";
import type {
  DotGiamGia,
  DotGiamGiaChiTiet,
} from "../../types/dotgiamgiatypes";

// Truy vấn danh sách DotGiamGia
const GET_ALL_DOT_GIAM_GIA = gql`
  query {
    dotGiamGias {
      giaTriGiam
      id
      loaiGiamGia
      maDot
      moTa
      tenDot
      thoiGianBatDau
      thoiGianKetThuc
      tinhTrang
      trangThai
    }
  }
`;

// Hàm lấy danh sách đợt giảm giá
export async function fetchAllDotGiamGia(): Promise<DotGiamGia[]> {
  try {
    const response = await apolloClient.query({ query: GET_ALL_DOT_GIAM_GIA });
    console.log("DotGiamGia Data:", response);
    return response.data.dotGiamGias;
  } catch (error) {
    console.error("Lỗi khi fetch DotGiamGia:", error);
    return [];
  }
}

// Truy vấn chi tiết DotGiamGia
const GET_ALL_DOT_GIAM_GIA_CHI_TIET = gql`
  query {
    dotGiamGiaChiTiets {
      id
      maDotChiTiet
      tinhTrang
      sanPhamChiTiet {
        id
      }
    }
  }
`;

// Hàm lấy danh sách chi tiết đợt giảm giá
export async function fetchAllDotGiamGiaChiTiet(): Promise<
  DotGiamGiaChiTiet[]
> {
  try {
    const response = await apolloClient.query({
      query: GET_ALL_DOT_GIAM_GIA_CHI_TIET,
    });
    console.log("DotGiamGiaChiTiet Data:", response);
    return response.data.dotGiamGiaChiTiets;
  } catch (error) {
    console.error("Lỗi khi fetch DotGiamGiaChiTiet:", error);
    return [];
  }
}

// Mutation thêm Đợt Giảm Giá
const ADD_DOT_GIAM_GIA = gql`
  mutation ($input: DotGiamGiaInput!) {
    createDotGiamGia(input: $input) {
      id
      maDot
      tenDot
      thoiGianBatDau
      thoiGianKetThuc
      giaTriGiam
      loaiGiamGia
      trangThai
      moTa
    }
  }
`;

export async function createDotGiamGia(
  dotGiamGiaData: any,
): Promise<DotGiamGia> {
  try {
    const response = await apolloClient.mutate({
      mutation: ADD_DOT_GIAM_GIA,
      variables: { input: dotGiamGiaData },
    });
    console.log("Response từ GraphQL:", response);
    return response.data.createDotGiamGia;
  } catch (error) {
    console.error("Lỗi khi thêm Đợt Giảm Giá:", error);
    throw error;
  }
}

// Mutation xóa Đợt Giảm Giá
const DELETE_DOT_GIAM_GIA = gql`
  mutation ($id: ID!) {
    deleteDotGiamGia(id: $id)
  }
`;

export async function deleteDotGiamGia(id: number): Promise<boolean> {
  if (!confirm("Bạn có chắc muốn xóa?")) return false;

  try {
    await apolloClient.mutate({
      mutation: DELETE_DOT_GIAM_GIA,
      variables: { id },
    });
    alert("Xóa thành công!");
    return true;
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    alert("Xóa thất bại!");
    return false;
  }
}

// Mutation thêm Chi Tiết Đợt Giảm Giá
const ADD_DOT_GIAM_GIA_CHI_TIET = gql`
  mutation ($input: DotGiamGiaChiTietInput!) {
    createDotGiamGiaChiTiet(input: $input) {
      dotGiamGia {
        id
      }
      sanPhamChiTiet {
        id
      }
      maDotChiTiet
    }
  }
`;


export async function createDotGiamGiaChiTiet(dotGiamGiaChiTiet: any) {
  try {
    const response = await apolloClient.mutate({
      mutation: ADD_DOT_GIAM_GIA_CHI_TIET,
      variables: { input: dotGiamGiaChiTiet },
    });
    console.log("Đã thêm:", response.data.createDotGiamGiaChiTiet);
  } catch (error) {
    console.error("Lỗi khi thêm:", error);
  }
}

