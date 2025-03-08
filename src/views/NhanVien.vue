<template>
  <div class="staff-list-container" style="width: 100%; height: 100%;">
    <div class="staff-list"></div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Mã, tên, sđt, email..." class="search-input">
      <button class="search-btn" @click="searchStaff">Tìm kiếm</button>
    </div>

    <div class="filters">
      <label>Trạng thái</label>
      <label>
        <input type="radio" value="all" v-model="filterStatus"> Tất cá
      </label>
      <label>
        <input type="radio" value="active" v-model="filterStatus"> Hoạt động
      </label>
      <label>
        <input type="radio" value="inactive" v-model="filterStatus"> Nghỉ việc
      </label>
    </div>

    <div class="actions">
      <div class="file-upload">
        <input type="file" @change="handleFileUpload" class="file-input">
      </div>
      <button class="import-btn" @click="importExcel">Nhập Excel</button>
      <button class="add-btn" @click="addStaff">Thêm khách hàng</button>
    </div>

    <table class="staff-table">
      <thead>
      <tr>
        <th>STT</th>
        <th>Mã</th>
        <th>Họ tên</th>
        <th>Số điện thoại</th>
        <th>Địa chỉ</th>
        <th>Trạng thái</th>
        <th>Thao tác</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(staff, index) in paginatedStaff" :key="staff.id">
      <td>{{ index + 1 }}</td>
        <td>{{ staff.code }}</td>
        <td>{{ staff.name }}</td>
        <td>{{ staff.phone }}</td>
        <td>{{ staff.address }}</td>
        <td>
            <span class="status" :class="staff.status === 'active' ? 'status-active' : 'status-inactive'">
              {{ staff.status === 'active' ? 'Hoạt động' : 'Nghỉ việc' }}
            </span>
        </td>
        <td>
          <button class="edit-btn" @click="editStaff(staff)">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="edit-btn" @click="deleteStaff(staff)">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="edit-btn" @click="detailsStaff(staff)">
            <i class="fa-solid fa-circle-info"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">‹</button>

    <button v-for="page in totalPages" :key="page"
            @click="goToPage(page)"
            :class="{ active: currentPage === page }">
      {{ page }}
    </button>

    <button @click="nextPage" :disabled="currentPage === totalPages">›</button>
  </div>

</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      filterStatus: "active",
      staff: [
        { id: 1, code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", address: "3 P. Trịnh Văn Bô, Hà Nội", status: "active" },
        { id: 2, code: "Linhhm", name: "Hoàng Mai Linh", phone: "0123456789", address: "3 P. Trịnh Văn Bô, Hà Nội", status: "inactive" },
        { id: 3, code: "KH003", name: "Hoàng Minh C", phone: "0777888999", address: "Đà Nẵng", status: "active" },
        { id: 4, code: "KH004", name: "Phạm Văn D", phone: "0345678901", address: "Cần Thơ", status: "inactive" },
        { id: 5, code: "KH005", name: "Lê Thanh E", phone: "0456789012", address: "Hải Phòng", status: "active" },
        { id: 6, code: "KH006", name: "Đặng Thu F", phone: "0567890123", address: "Huế", status: "inactive" },
        { id: 7, code: "KH007", name: "Bùi Công G", phone: "0678901234", address: "Nha Trang", status: "active" },
        { id: 8, code: "KH008", name: "Ngô Thị H", phone: "0789012345", address: "Quảng Ninh", status: "inactive" },
        { id: 9, code: "KH009", name: "Hoàng Minh I", phone: "0890123456",  address: "Vinh", status: "active" },
        { id: 10, code: "KH010", name: "Phan Văn J", phone: "0901234567", address: "Bình Dương", status: "inactive" }
      ],
      currentPage: 1,
      itemsPerPage: 5
    };
  },
  computed: {
    filteredStaff() {
      return this.staff.filter(staff =>
          (this.searchQuery === "" || staff.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
          (this.filterStatus === "all" || staff.status === this.filterStatus)
      );
    },
    paginatedStaff() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredStaff.slice(start, start + this.itemsPerPage);
    },
    totalPages() {
      return Math.ceil(this.filteredStaff.length / this.itemsPerPage) || 1;
    }
  },
  methods: {
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    searchStaff() {
      console.log("Tìm kiếm:", this.searchQuery);
    },
    handleFileUpload(event) {
      console.log("File uploaded:", event.target.files[0]);
    },
    importExcel() {
      console.log("Nhập Excel");
    },
    addStaff() {
      console.log("Thêm khách hàng");
    },
    editStaff(staff) {
      console.log("Chỉnh sửa:", staff);
    },
    deleteStaff(staff) {
      console.log("Xóa:", staff);
    },
    detailsStaff(staff) {
      console.log("Xem chi tiết:", staff);
    }
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.pagination button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
}
.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.staff-list-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
}
.search-bar {
  padding-left: 200px;
  padding-top: 20px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  width: 300px;
}
.search-input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-btn {
  background: black;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
}
.filters {
  padding-left: 200px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
.actions {
  padding-right: 100px;
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  float: right;
}
.file-upload {
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 5px;
  width: fit-content;
}
.staff-table {
  width: 100%;
  border-collapse: collapse;
}
.staff-table th, .staff-table td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
}
.add-btn{
  background: #557ef8;
  color: white;
  border: 0;
  border-radius: 10px;
}
.import-btn{
  background: #839eb6;
  color: white;
  border: 0;
  border-radius: 10px;
}
.status {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid;
  display: inline-block;
}
.status-active {
  color: green;
  border-color: green;
  font-weight: bold;
}
.status-inactive {
  color: red;
  border-color: red;
  font-weight: bold;
}
.edit-btn {
  background: none;
  border: none;
  cursor: pointer;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.pagination button {
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid black;
  cursor: pointer;
  color: black;
  background: white;
}
.pagination .active {
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
}
.staff-list {
  width: 100%;
  height: 230px;
  background-image: url('https://res.cloudinary.com/dieecfslw/image/upload/v1741460349/12345c36aa3437fa03063025316842dd_ecpkm6.png');
  background-size: cover;
  background-position: center -100px;
  background-repeat: no-repeat;
  padding-bottom: 20px;
}

</style>