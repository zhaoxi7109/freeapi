package com.zhaoxi.project.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 全局跨域配置
 *
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // 覆盖所有请求
        registry.addMapping("/**")
                .allowedOrigins("*") //允许域名
                .allowedMethods("GET", "HEAD","POST", "PUT", "DELETE", "OPTIONS") //允许请求方法
                .allowCredentials(true) // 允许发送 Cookie
                .allowedHeaders("*")  //允许请求头
                .maxAge(3600); //最大请求时长
    }
}


