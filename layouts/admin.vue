<template>
  <div>
      <div class="row">
          <sidebar-admin class="col-2"/>
            <div class="ml-auto col-10">
                <nuxt/>
            </div>
      </div>
  </div>
</template>

<script>
import SidebarAdmin from "@/components/Admin/SidebarAdmin/SidebarAdmin"
export default {
    components:{SidebarAdmin},
}
</script>


        SideBarAdmin