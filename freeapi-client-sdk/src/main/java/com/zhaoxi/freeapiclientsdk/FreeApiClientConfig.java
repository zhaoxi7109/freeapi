package com.zhaoxi.freeapiclientsdk;

import com.zhaoxi.freeapiclientsdk.client.FreeApiClient;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/**
 * FreeApi 客户端配置
 *
 */
@Configuration
@ConfigurationProperties("freeapi.client")
@Data
@ComponentScan
public class FreeApiClientConfig {

    private String accessKey;

    private String secretKey;

    @Bean
    public FreeApiClient freeApiClient() {
        return new FreeApiClient(accessKey, secretKey);
    }

}
