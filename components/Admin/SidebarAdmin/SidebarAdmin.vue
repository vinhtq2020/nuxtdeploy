<template>
<nav class="bg-light sidebar border-right">
    
<div class="sidebar-sticky">
    <ul class="nav flex-column " style="list-style:none;font-size:.875rem;font-weight:500">
        <li class="nav-item">
            <nuxt-link :to="{path:'/admin/revenue'}" class="nav-link active text-dark">
                Revenue
            </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link :to="{path:'/admin/book'}" class="nav-link text-dark">
                Book
            </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link :to="{path:'/admin/category'}" class="nav-link text-dark">
                Category
            </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link :to="{path:'/admin/author'}" class="nav-link text-dark">
                Author
            </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link :to="{path:'/admin/nxb'}" class="nav-link text-dark">
                NXB
            </nuxt-link>
        </li>
        <li class="nav-item">
            <nuxt-link :to="{path:'/admin/usermanager'}" class="nav-link text-dark">
                Customer
            </nuxt-link>
        </li>
        
    </ul>
</div>

</nav>
</template>

<script>
export default {};
</script>

<style>
   .sidebar{
       position: fixed;
       top:0;
       bottom:0;
       left: 0;
       z-index: 100;
       padding:48px 0 0;
       box-shadow: -1px 0 0 rgba(0, 0, 0,10%);
   }
   .sidebar-sticky{
       position: sticky;
   }
</style>
