package com.zhaoxi.project.config;

import com.zhaoxi.project.common.ErrorCode;
import com.zhaoxi.project.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;



/**
 * 获取验证码配置类
 */
@Configuration
public class CaptchaConfig {
    @Value("${freeapi.sms.access-key}")
    private String accessKeyId;
    @Value("${freeapi.sms.secret-key}")
    private String accessKeySecret;

    /**
     * 使用AK&SK初始化账号Client
     *
     * @return Client
     * @throws Exception
     */
    @Bean
    public com.aliyun.dysmsapi20170525.Client createClient() throws Exception {
        //校验ak与sk不为空
        if (accessKeyId.equals("")&&accessKeySecret.equals("")){
            throw new BusinessException(ErrorCode.OPERATION_ERROR, "未配置ak与sk");
        }
        com.aliyun.teaopenapi.models.Config config = new com.aliyun.teaopenapi.models.Config()
                .setAccessKeyId(accessKeyId)
                .setAccessKeySecret(accessKeySecret);
        config.endpoint = "dysmsapi.aliyuncs.com";
        return new com.aliyun.dysmsapi20170525.Client(config);
    }
}




