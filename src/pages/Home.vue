<style scoped>
.el-main {
  background-color: #f5f7f9;
}
.el-header,
.el-footer {
  background-color: white;
  box-sizing: border-box;
}
.el-container {
  height: 100%;
}
.el-header{
  padding: 0px;
}
</style>

 <template>
  <el-container>
    <!-- header部分 -->
    <el-header style="padding:0px">
      <navtop></navtop>
    </el-header>
    <el-container>
       <!-- aside部分 -->
      <leftNav></leftNav>
      <el-main>
         <!-- main部分 -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>


 <script>
import navtop from "@/components/navtop.vue";
import leftNav from "@/components/nav.vue";
export default {
  components: {
    navtop,
    leftNav
  },
  data() {
    return {};
  },
  methods: {}
};
</script>